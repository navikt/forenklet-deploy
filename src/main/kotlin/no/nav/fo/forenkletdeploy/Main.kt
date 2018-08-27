package no.nav.fo.forenkletdeploy

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule
import no.nav.fo.forenkletdeploy.util.SSLUtil
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import javax.inject.Inject

import com.fasterxml.jackson.databind.DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT
import com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES
import no.nav.fo.forenkletdeploy.util.Utils.getRequiredProperty
import java.net.URL

@SpringBootApplication
open class Main

fun main(args: Array<String>) {
    if ("true".equals(System.getProperty("webproxy.enabled", "true"), ignoreCase = true)) {
        val url = URL(getRequiredProperty("HTTP_PROXY"))
        val noProxy = getRequiredProperty("NO_PROXY")
                .split(",")
                .joinToString("|") {
                    if (it.startsWith(".")) "*$it" else it
                }

        SSLUtil.turnOffSslChecking()
        System.setProperty("http.nonProxyHosts", noProxy)
        System.setProperty("http.proxyHost", url.host)
        System.setProperty("http.proxyPort", url.port.toString())
        System.setProperty("https.proxyHost", url.host)
        System.setProperty("https.proxyPort", url.port.toString())
    }

    SpringApplication.run(Main::class.java, *args)
}

@Inject
fun configureObjectMapper(mapper: ObjectMapper) {
    mapper.registerModule(ParameterNamesModule())
            .registerModule(Jdk8Module())
            .registerModule(JavaTimeModule())
            .registerModule(KotlinModule())
            .configure(FAIL_ON_UNKNOWN_PROPERTIES, false)
            .configure(ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true)
}