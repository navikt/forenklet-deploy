package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.Team
import no.nav.fo.forenkletdeploy.service.TeamService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.inject.Inject

@RestController
@RequestMapping("/api/teams")
class TeamResource @Inject
constructor(val teamService: TeamService) {
    @GetMapping
    fun allTeams(): List<Team> =
            teamService.allTeams.map {
                Team(
                        id = it.id,
                        jenkinsFolder = it.jenkinsFolder,
                        displayName = it.displayName,
                        jenkinsUrl = it.jenkinsUrl,
                        provideVersion = it.provideVersion
                )
            }
}
