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

@SpringBootApplication
open class Main

fun main(args: Array<String>) {
    if ("true".equals(System.getProperty("webproxy.enabled", "true"), ignoreCase = true)) {
        SSLUtil.turnOffSslChecking()
        System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no")
        System.setProperty("http.proxyHost", "webproxy-nais.nav.no")
        System.setProperty("http.proxyPort", "8088")
        System.setProperty("https.proxyHost", "webproxy-nais.nav.no")
        System.setProperty("https.proxyPort", "8088")
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