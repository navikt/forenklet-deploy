package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.service.ApplicationService
import no.nav.fo.forenkletdeploy.service.GitService
import no.nav.fo.forenkletdeploy.service.TeamService
import no.nav.fo.forenkletdeploy.service.VeraDeployService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.inject.Inject

@RestController
@RequestMapping("/internal")
class InternalResource @Inject
constructor(
        private val applicationService: ApplicationService,
        private val veraDeployService: VeraDeployService,
        private val teamService: TeamService,
        private val gitService: GitService
) {
    private var ready = false

    @GetMapping("/isAlive")
    fun isAliveCheck(): String =
            "Application: UP"

    @GetMapping("/isReady")
    fun isReadyCheck(): String {
        if (!ready) {
            teamService.allTeams.forEach { t->veraDeployService.getDeploysForTeam(t.id)}
            applicationService.getAllApplications().forEach { application -> application.fold({ t -> throw t }) { veraDeployService.getDeploysForApp(it.name) } }
            gitService.ping()
            ready = true
        }
        return "Application: READY"
    }

}
