package no.nav.fo.forenkletdeploy

import no.nav.fo.forenkletdeploy.util.SSLUtil
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class MainTest: Main()

fun main(args: Array<String>) {
    System.setProperty("webpeoxy.enabled", "false")
    System.setProperty("UNLEASH_API_URL", "https://unleash.herokuapp.com/api/")

    SSLUtil.turnOffSslChecking()
    System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no")
    System.setProperty("http.proxyHost", "webproxy-utvikler.nav.no")
    System.setProperty("http.proxyPort", "8088")
    System.setProperty("https.proxyHost", "webproxy-utvikler.nav.no")
    System.setProperty("https.proxyPort", "8088")

    SpringApplication.run(MainTest::class.java, *args)
}
