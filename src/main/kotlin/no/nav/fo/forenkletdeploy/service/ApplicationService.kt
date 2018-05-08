package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class ApplicationService @Inject
constructor(
    val teamService: TeamService
) {
    fun getAllApplications() =
            teamService.allTeams.flatMap { getAppsForTeam(it.id) }

    fun getAppsForTeam(teamId: String): List<ApplicationConfig> =
            teamService.getAppsForTeam(teamId)

    fun getAppByName(name: String): ApplicationConfig =
            getAllApplications().first { it.name.equals(name, ignoreCase = true) }
}