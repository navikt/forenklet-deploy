package no.nav.fo.forenkletdeploy.teams

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.Utils.fromJson
import no.nav.fo.forenkletdeploy.util.Utils.getRequiredProperty
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.slf4j.LoggerFactory

import javax.ws.rs.core.MediaType
import java.util.ArrayList

class TeamSoknad : Team {

    override var applicationConfigs: List<ApplicationConfig> = ArrayList()
    private val logger = LoggerFactory.getLogger(TeamSoknad::class.java.name)

    override val id = "sd"
    override val displayName = "Team Søknad"
    override val jenkinsFolder = "team_soknad"

    override fun hentApplicationConfigs() {
        try {
            val configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/team_soknad/config.json"
            val apiToken = getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")

            val json = withClient(configUrl)
                    .request(MediaType.APPLICATION_JSON)
                    .header("Authorization", "token $apiToken")
                    .get(String::class.java)

            val map = fromJson(json, SDAppConfig::class.java)
            val mutableAppConfigs = map.entries
                    .map { ApplicationConfig( name = it.key, gitUrl = it.value.gitUrl ) }
                    .toMutableList()

            mutableAppConfigs.add(
                    ApplicationConfig( name = "henvendelse", gitUrl = "ssh://git@stash.devillo.no:7999/dial/henvendelse.git" )
            )
            this.applicationConfigs = mutableAppConfigs.toList()
            logger.info("Oppdaterer Team søknad med ${this.applicationConfigs.size} applikasjoner")
        } catch (t: Throwable) {
            logger.error("Feil ved henting av applicationConfigs for team søknad")
        }

    }
}

data class SDConfig(
        val gitUrl: String = "",
        val sone: String? = null
)

class SDAppConfig: HashMap<String, SDConfig>()
