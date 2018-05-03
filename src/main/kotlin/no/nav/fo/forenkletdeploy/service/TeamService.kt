package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.Team
import no.nav.fo.forenkletdeploy.provider.TeamProvider
import org.springframework.stereotype.Component
import javax.inject.Inject

@Component
class TeamService @Inject constructor(
        val teamProvider: TeamProvider
) {
    fun getTeams(): List<Team> =
            teamProvider.teams.map {
                Team(id = it.id, displayName = it.displayName, jenkinsFolder = it.jenkinsFolder)
            }
}