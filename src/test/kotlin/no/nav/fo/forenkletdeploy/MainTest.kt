package no.nav.fo.forenkletdeploy

import no.nav.fo.forenkletdeploy.config.ApplicationTestConfig
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@Import(ApplicationTestConfig::class)
@EnableAutoConfiguration
open class MainTest: Main()

fun main(args: Array<String>) {
    System.setProperty("webpeoxy.enabled", "false")
    System.setProperty("UNLEASH_API_URL", "https://unleash.herokuapp.com/api/")
    SpringApplication.run(MainTest::class.java, *args)
}
