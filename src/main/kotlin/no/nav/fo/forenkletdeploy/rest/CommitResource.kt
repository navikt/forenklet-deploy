package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.service.ApplicationService
import no.nav.fo.forenkletdeploy.service.CommitService
import org.springframework.web.bind.annotation.*

import javax.inject.Inject

@RequestMapping("/api/commit")
@RestController
class CommitResource @Inject
constructor(
        val applicationService: ApplicationService,
        val commitService: CommitService
) {

    @GetMapping("/{application}")
    fun getCommitsForApplication(@PathVariable("application") application: String, @RequestParam("fromVersion") fromVersion: String, @RequestParam("toVersion") toVersion: String): List<Commit> {
        val appConfig = applicationService.getAppByName(application)

        return commitService.getCommitsForRelease(
                application = appConfig,
                fromVersion = fromVersion,
                toVersion = toVersion
            )
    }
}
