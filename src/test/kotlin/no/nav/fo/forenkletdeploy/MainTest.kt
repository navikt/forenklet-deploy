package no.nav.fo.forenkletdeploy

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class MainTest: Main()

fun main(args: Array<String>) {
    System.setProperty("webpeoxy.enabled", "false")
    System.setProperty("UNLEASH_API_URL", "https://unleash.herokuapp.com/api/")
    SpringApplication.run(MainTest::class.java, *args)
}
