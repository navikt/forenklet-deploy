package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.service.CommitService
import no.nav.fo.forenkletdeploy.service.IApplicationService
import no.nav.fo.forenkletdeploy.util.NotFoundException
import org.springframework.web.bind.annotation.*

import javax.inject.Inject

@RequestMapping("/api/commit")
@RestController
class CommitResource @Inject
constructor(val applicationService: IApplicationService, val commitService: CommitService) {

    @GetMapping("/{application}")
    fun getCommitsForApplication(@PathVariable("application") application: String, @RequestParam("fromVersion") fromVersion: String, @RequestParam("toVersion") toVersion: String): List<Commit> {
        val appConfig = applicationService.getAppByName(application) ?: throw NotFoundException("Kunne ikke finne commits for $application")

        return commitService.getCommitsForRelease(
                application = appConfig,
                fromVersion = fromVersion,
                toVersion = toVersion
            )
    }
}
