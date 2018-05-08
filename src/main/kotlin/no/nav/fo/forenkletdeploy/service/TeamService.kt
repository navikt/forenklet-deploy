package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.consumer.getTeamConfigConsumer
import org.springframework.stereotype.Service

@Service
class TeamService {
    val allTeams = arrayListOf(FOTeam(), TeamSoknad(), TeamOppfolging())

    fun getTeam(teamId: String): ITeam =
            allTeams.first{ it.id.equals(teamId, ignoreCase = true) }

    fun getAppsForTeam(teamId: String): List<ApplicationConfig> =
            allTeams.find { it.id.equals(teamId, ignoreCase = true) }
                    ?.getApplicationConfigs()?: emptyList()
}

abstract class ITeam constructor(
        val id: String,
        val displayName: String,
        val configUrl: String,
        val jenkinsFolder: String,
        val ignoredApplications: List<String>,
        val extraApps: List<ApplicationConfig>
) {
    private val teamConfigConsumer = getTeamConfigConsumer()

    fun getApplicationConfigs(): List<ApplicationConfig> =
            teamConfigConsumer.hentTeamConfig(uri = configUrl, useAuth = true)
                    .entries
                    .map { ApplicationConfig( name = it.key, gitUrl = it.value.gitUrl ) }
                    .filter { !ignoredApplications.contains(it.name) }
                    .union(extraApps)
                    .toList()
}

class FOTeam: ITeam(
        id = "fo",
        displayName = "Forenklet Oppfølging",
        configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/forenklet_oppfolging/config.json",
        extraApps = emptyList(),
        jenkinsFolder = "forenklet_oppfolging",
        ignoredApplications = arrayListOf("badkitty", "veilarbdemo")
)

class TeamSoknad: ITeam(
        id = "sd",
        displayName = "Team søknad",
        configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/team_soknad/config.json",
        jenkinsFolder = "team_soknad",
        ignoredApplications = emptyList(),
        extraApps = arrayListOf(
                ApplicationConfig( name = "henvendelse", gitUrl = "ssh://git@stash.devillo.no:7999/dial/henvendelse.git" )
        )
)

class TeamOppfolging: ITeam(
        id = "teamoppfolging",
        displayName = "Team Oppfølging",
        configUrl = "http://stash.devillo.no/projects/OPP/repos/team-oppfolging/raw/applikasjonsportefolje/config.json",
        jenkinsFolder = "teamoppfolging",
        extraApps = emptyList(),
        ignoredApplications = emptyList()
)
