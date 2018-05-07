package no.nav.fo.forenkletdeploy.teams

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.Utils.fromJson
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.slf4j.LoggerFactory

import java.util.ArrayList

class TeamOppfolging : Team {
    private val logger = LoggerFactory.getLogger(TeamOppfolging::class.java.name)
    val APPLICATION_CONFIG_URL = "http://stash.devillo.no/projects/OPP/repos/team-oppfolging/raw/applikasjonsportefolje/config.json"

    override var applicationConfigs: List<ApplicationConfig> = ArrayList()
    override val id = "teamoppfolging"
    override val displayName = "Team Oppfølging"
    override val jenkinsFolder = "teamoppfolging"

    override fun hentApplicationConfigs() {
        try {
            val json = withClient(APPLICATION_CONFIG_URL).request().get(String::class.java)
            val map = fromJson(json, OppfolgingAppConfig::class.java)
            this.applicationConfigs = map.entries
                    .map { ApplicationConfig( name = it.key, gitUrl = it.value.gitUrl ) }
        } catch (e: Throwable) {
            logger.error("Feil ved henting av application-configs for team-oppfølging")
        }

    }
}

data class OppfolgingConfig(
        val gitUrl: String = ""
)

class OppfolgingAppConfig: HashMap<String, OppfolgingConfig>()