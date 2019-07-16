package no.nav.fo.forenkletdeploy.util

import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class CorsFilter: Filter {
    val ORIGIN = "Origin"
    val ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin"

    val ALLOWED_METHODS = arrayOf(
            "GET",
            "HEAD",
            "POST",
            "PATCH",
            "PUT",
            "DELETE",
            "OPTIONS"
    ).joinToString(", ")

    override fun init(filterConfig: FilterConfig?) {
    }

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
        val httpServletRequest = request as HttpServletRequest
        val originHeader = httpServletRequest.getHeader(ORIGIN)

        val httpServletResponse = response as HttpServletResponse
        httpServletResponse.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, originHeader)
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true")
        httpServletResponse.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS)

        chain.doFilter(request, response)
    }

    override fun destroy() {
    }

}