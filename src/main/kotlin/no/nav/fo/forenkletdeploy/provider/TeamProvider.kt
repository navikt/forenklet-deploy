package no.nav.fo.forenkletdeploy.provider

import no.nav.fo.forenkletdeploy.teams.FOTeam
import no.nav.fo.forenkletdeploy.teams.Team
import no.nav.fo.forenkletdeploy.teams.TeamOppfolging
import no.nav.fo.forenkletdeploy.teams.TeamSoknad
import org.springframework.stereotype.Component

import java.util.ArrayList

@Component
class TeamProvider {

    val teams = arrayListOf(
            FOTeam(), TeamOppfolging(), TeamSoknad()
    )
}
