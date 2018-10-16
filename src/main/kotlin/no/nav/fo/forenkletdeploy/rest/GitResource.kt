package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.GitTag
import no.nav.fo.forenkletdeploy.service.ApplicationService
import no.nav.fo.forenkletdeploy.service.GitService
import org.springframework.web.bind.annotation.*

import javax.inject.Inject

@RequestMapping("/api/commit")
@RestController
class GitResource @Inject
constructor(
        val applicationService: ApplicationService,
        val gitService: GitService
) {

    @GetMapping("/{application}")
    fun getCommitsForApplication(@PathVariable("application") application: String, @RequestParam("fromVersion") fromVersion: String, @RequestParam("toVersion") toVersion: String): List<Commit> {
        val appConfig = appByName(application)

        return gitService.getCommitsForRelease(
                application = appConfig,
                fromVersion = fromVersion,
                toVersion = toVersion
            )
    }


    private fun appByName(application: String): ApplicationConfig {
        return applicationService.getAppByName(application) ?: throw RuntimeException("Kunne ikke finne '$application' blandt konfigurerte applikasjoner.")
    }

}
