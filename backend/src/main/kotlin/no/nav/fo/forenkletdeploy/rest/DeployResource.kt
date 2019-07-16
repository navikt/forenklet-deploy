package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.service.VeraDeployService
import org.springframework.web.bind.annotation.*

import javax.inject.Inject

@RestController
@RequestMapping("/api/deploy")
class DeployResource @Inject
constructor(
        val veraDeployService: VeraDeployService
) {
    @GetMapping
    fun getAllDeploys(@RequestParam("team") teamId: String) =
            veraDeployService.getDeploysForTeam(teamId)

    @GetMapping("/{application}")
    fun getAllDeploysForApplication(@PathVariable("application") application: String) =
            veraDeployService.getDeploysForApp(application)

    @GetMapping("/{application}/{environment}")
    fun getDeploy(@PathVariable("application") application: String, @PathVariable("environment") environment: String) =
            veraDeployService.getDeploysForApp(application)
                    .filter { it.environment.equals(environment, ignoreCase = true) }
                    .first()
}
