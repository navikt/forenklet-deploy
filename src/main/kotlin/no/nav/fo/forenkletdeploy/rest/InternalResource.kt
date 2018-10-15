package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.service.ApplicationService
import no.nav.fo.forenkletdeploy.service.GitService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.inject.Inject

@RestController
@RequestMapping("/internal")
class InternalResource @Inject
constructor(
        val applicationService: ApplicationService,
        val gitService: GitService
) {
    private var ready = false

    @GetMapping("/isAlive")
    fun isAliveCheck(): String =
            "Application: UP"

    @GetMapping("/isReady")
    fun isReadyCheck(): String {
        if (!ready) {
            applicationService.getAllApplications().forEach({ a -> gitService.getTagsForApplication(a) })
            ready = true
        }
        return "Application: READY"
    }
}
