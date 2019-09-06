package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.util.Utils.withSecureClient
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigInteger
import java.net.URLEncoder.encode
import java.security.SecureRandom
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

typealias State = String

data class GithubResponse(val access_token: String, val scope: String, val token_type: String)

@RestController
@RequestMapping("/auth")
class AuthResource() {

    val LOG = LoggerFactory.getLogger(this.javaClass)

    val clientId = System.getenv("CLIENT_ID")
    val clientSecret = System.getenv("CLIENT_SECRET")
    val redirectUri = System.getenv("REDIRECT_URI")

    val random = SecureRandom()
    val stateStorage = mutableMapOf<State, String>()

    @GetMapping("/test")
    fun test(httpServletRequest: HttpServletRequest): String? {
        val state = createUnguessableString()
        stateStorage.putIfAbsent(state, "")
        return httpServletRequest.servletPath
    }

    @GetMapping("/login")
    fun login(httpServletRequest: HttpServletRequest, httpServletResponse: HttpServletResponse) {

        val unguessableString = createUnguessableString()
        stateStorage.putIfAbsent(unguessableString, "")

        val githubUrl = "https://github.com/login/oauth/authorize?" +
                "client_id=${encode(clientId, "UTF-8")}&" +
                "redirect_uri=${encode(redirectUri, "UTF-8")}&" +
                "scope=repo_deployment&" +
                "state=${unguessableString}&" +
                "allow_signup=false"

        httpServletResponse.sendRedirect(githubUrl)
    }


    @GetMapping("/callback")
    fun callback(httpServletResponse: HttpServletResponse, @PathVariable("code") code: String, @PathVariable("state") state: String) {

        if (state.isBlank() || code.isBlank()) {
            LOG.warn("Callback med manglende requestparametere code:${code} og state:${state}")
            httpServletResponse.sendError(404)
        }

        val storedState = stateStorage[state]
        if (storedState == null) {
            LOG.error("Mismatch mellom lagret og innsendt state:${state}")
            httpServletResponse.sendError(404)
            return
        }
        stateStorage.remove(storedState)

        val response = withSecureClient("https://github.com/login/oauth/access_token")
                .queryParam("client_id", clientId)
                .queryParam("client_secret", clientSecret)
                .queryParam("code", code)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("state", state)
                .request()
                .accept("application/json")
                .post(null)

    }

    private fun createUnguessableString(): String {
        val bytes = ByteArray(40)
        random.nextBytes(bytes)
        val state = BigInteger(1, bytes).toString(16)
        return state
    }
}
