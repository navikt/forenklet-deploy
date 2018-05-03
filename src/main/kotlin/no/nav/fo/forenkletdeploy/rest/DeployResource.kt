package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.VeraDeploy
import no.nav.fo.forenkletdeploy.service.IApplicationService
import no.nav.fo.forenkletdeploy.service.IVeraDeployService
import no.nav.fo.forenkletdeploy.util.NotFoundException
import org.springframework.web.bind.annotation.*

import javax.inject.Inject
import java.util.Arrays
import java.util.stream.Collectors

@RestController
@RequestMapping("/api/deploy")
class DeployResource @Inject
constructor(
        val veraDeployService: IVeraDeployService,
        val applicationService: IApplicationService
) {
    private val gyldigeMiljoer = Arrays.asList("p", "q0", "q6", "t6")

    @GetMapping
    fun getAllDeploys(@RequestParam("team") teamId: String) =
            getVeraDeploys(applicationService.getAppsByTeam(teamId))

    @GetMapping("/{application}")
    fun getAllDeploysForApplication(@PathVariable("application") application: String) =
            getVeraDeploys(applicationService.getApps())
                .filter { application.equals(it.application, ignoreCase = true) }

    @GetMapping("/{application}/{environment}")
    fun getDeploy(@PathVariable("application") application: String, @PathVariable("environment") environment: String) =
            getVeraDeploys(applicationService.getApps())
                    .filter { it.application.equals(application, ignoreCase = true) }
                    .filter { it.environment.equals(environment, ignoreCase = true) }
                    .first()

    private fun getVeraDeploys(applicationConfigs: List<ApplicationConfig>) =
            veraDeployService.getVeraDeploys()
                    .filter { gyldigeMiljoer.contains(it.environment) }
                    .filter { applicationConfigs.map { it.name }.contains(it.application) }
}
