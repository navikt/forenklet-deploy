package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.consumer.TeamConfigConsumer
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class TeamService @Inject
constructor(
        val teamConfigConsumer: TeamConfigConsumer
) {
    val allTeams = arrayListOf(FOTeam(), TeamSoknad(), TeamOppfolging(), TeamPAMAasmund(), TeamPAMTuan(), TeamPAMJ(), TeamVEDFP())

    fun getAppsForTeam(teamId: String): List<ApplicationConfig> =
            allTeams.find { it.id.equals(teamId, ignoreCase = true) }
                    ?.getApplicationConfigs(teamConfigConsumer)?: emptyList()
}

abstract class ITeam constructor(
        val id: String,
        val displayName: String,
        val configUrl: String,
        val jenkinsFolder: String,
        val jenkinsUrl: String = "http://bekkci.devillo.no",
        val provideVersion: Boolean = false,
        val ignoredApplications: List<String> = emptyList(),
        val extraApps: List<ApplicationConfig> = emptyList(),
        val environments: List<String> = listOf("T6", "Q6", "Q0", "P")
) {
    fun getApplicationConfigs(configConsumer: TeamConfigConsumer): List<ApplicationConfig> =
            configConsumer.hentTeamConfig(uri = configUrl, useAuth = true)
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
        jenkinsFolder = "forenklet_oppfolging",
        ignoredApplications = arrayListOf("badkitty", "veilarbdemo"),
        environments = listOf("Q6", "Q0", "P")
)

class TeamSoknad: ITeam(
        id = "sd",
        displayName = "Team søknad",
        configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/team_soknad/config.json",
        jenkinsFolder = "team_soknad",
        extraApps = arrayListOf(
                ApplicationConfig( name = "soknad-kontantstotte", gitUrl = "https://github.com/navikt/soknad-kontantstotte.git" ),
                ApplicationConfig( name = "soknad-aap-utland", gitUrl = "https://github.com/navikt/soknad-aap-utland.git" ),
                ApplicationConfig( name = "soknad-kontantstotte-api", gitUrl = "https://github.com/navikt/soknad-kontantstotte-api.git" ),
                ApplicationConfig( name = "soknad-kontantstotte-proxy", gitUrl = "https://github.com/navikt/soknad-kontantstotte-proxy.git" )
        ),
        environments = listOf("T6", "Q0", "P")
)

class TeamOppfolging: ITeam(
        id = "teamoppfolging",
        displayName = "Team Oppfølging",
        configUrl = "http://stash.devillo.no/projects/OPP/repos/team-oppfolging/raw/applikasjonsportefolje/config.json",
        jenkinsFolder = "teamoppfolging"
)

class TeamPAMAasmund: ITeam(
        id = "teampamaasmund",
        displayName = "Team PAM Aasmund",
        configUrl = "https://raw.githubusercontent.com/navikt/pam-scripts/master/applikasjonsportefolje/config-teamaasmund.json",
        jenkinsFolder = "teamaasmund",
        jenkinsUrl = "https://jenkins-pam.adeo.no",
        provideVersion = true
)

class TeamPAMTuan: ITeam(
        id = "teampamtuan",
        displayName = "Team PAM Tuan",
        configUrl = "https://raw.githubusercontent.com/navikt/pam-scripts/master/applikasjonsportefolje/config-teamtuan.json",
        jenkinsFolder = "teamtuan",
        jenkinsUrl = "https://jenkins-pam.adeo.no",
        provideVersion = true
)

class TeamPAMJ: ITeam(
        id = "teampamj",
        displayName = "Team PAM J",
        configUrl = "https://raw.githubusercontent.com/navikt/pam-scripts/master/applikasjonsportefolje/config-teamj.json",
        jenkinsFolder = "teamj",
        jenkinsUrl = "https://jenkins-pam.adeo.no",
        provideVersion = true
)

class TeamVEDFP: ITeam(
        id = "teamforeldrepenger",
        displayName = "Team Foreldrepenger",
        configUrl = "http://stash.devillo.no/projects/VEDFP/repos/team-vedtak/raw/applikasjonsportefolje/config.json",
        jenkinsFolder = "teamforeldrepenger",
        environments = listOf("T10", "Q10", "Q7", "Q1", "Q0", "P")
)
