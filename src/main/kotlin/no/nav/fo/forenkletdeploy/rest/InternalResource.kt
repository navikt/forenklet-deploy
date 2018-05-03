package no.nav.fo.forenkletdeploy.rest

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/internal")
class InternalResource {
    @GetMapping("/isAlive")
    fun isAliveCheck(): String =
            "Application: UP"
}
