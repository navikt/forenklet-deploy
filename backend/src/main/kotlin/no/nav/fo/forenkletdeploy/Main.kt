package no.nav.fo.forenkletdeploy

import com.fasterxml.jackson.databind.DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT
import com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule
import no.nav.fo.forenkletdeploy.util.SSLUtil
import no.nav.fo.forenkletdeploy.util.Utils.getRequiredProperty
import org.slf4j.LoggerFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import javax.inject.Inject

@SpringBootApplication
open class Main

fun main(args: Array<String>) {
    val LOG = LoggerFactory.getLogger(Main::class.java)

    if ("true".equals(System.getProperty("webproxy.enabled", "true"), ignoreCase = true)) {
        SSLUtil.turnOffSslChecking() // Ellers vil det feile mot unleash-apiet -_-

        System.setProperty("http.nonProxyHosts", "localhost|127.0.0.1|10.254.0.1|*.local|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no")
        System.setProperty("http.proxyHost", "webproxy.nais")
        System.setProperty("http.proxyPort", "8088")
        System.setProperty("https.proxyHost", "webproxy.nais")
        System.setProperty("https.proxyPort", "8088")

        LOG.info("http.nonProxyHosts: {}", java.lang.System.getProperty("http.nonProxyHosts"))
        LOG.info("http.proxyHost: {}", java.lang.System.getProperty("http.proxyHost"))
        LOG.info("http.proxyPort: {}", java.lang.System.getProperty("http.proxyPort"))
        LOG.info("https.proxyPort: {}", java.lang.System.getProperty("https.proxyPort"))
        LOG.info("https.proxyPort: {}", java.lang.System.getProperty("https.proxyPort"))
        LOG.info("http.nonProxyHosts: {}", java.lang.System.getProperty("http.nonProxyHosts"))

    } else {
        LOG.info("Web proxy settings disabled. Skipping.")
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
