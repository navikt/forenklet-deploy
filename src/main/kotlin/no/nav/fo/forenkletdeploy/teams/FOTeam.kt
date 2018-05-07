package no.nav.fo.forenkletdeploy.teams

import no.nav.fo.forenkletdeploy.ApplicationConfig
import org.slf4j.LoggerFactory

import java.util.ArrayList

import no.nav.fo.forenkletdeploy.util.Utils.fromJson
import no.nav.fo.forenkletdeploy.util.Utils.getRequiredProperty
import no.nav.fo.forenkletdeploy.util.Utils.withClient

class FOTeam : Team {
    private val logger = LoggerFactory.getLogger(FOTeam::class.java.name)

    private val IGNORED_APPLICATIONS = arrayOf(
            "veilarbdemo",
            "badkitty"
    )

    override var applicationConfigs: List<ApplicationConfig> = ArrayList()
    override val id = "fo"
    override val displayName = "Forenklet Oppfølging"
    override val jenkinsFolder = "forenklet_oppfolging"

    override fun hentApplicationConfigs() {
        try {
            val apiToken = getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")
            val configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/forenklet_oppfolging/config.json"
            val json = withClient(configUrl)
                    .request()
                    .header("Authorization", "token $apiToken")
                    .get(String::class.java)
            val map: FOAppConfig = fromJson(json, FOAppConfig::class.java)

            val applications = map.entries
                    .map { ApplicationConfig( name = it.key, gitUrl = it.value.gitUrl ) }
                    .filter { !IGNORED_APPLICATIONS.contains(it.name) }

            if (applications.isNotEmpty()) {
                logger.info("Oppdaterer forenklet-oppfølging med " + applications.size + " applikasjoner.")
                this.applicationConfigs = applications
            }

        } catch (e: Throwable) {
            logger.error("Feil ved henting av applicationConfig for FO", e)
        }
    }
}


data class FOConfig(
        val gitUrl: String = "",
        val sone: String? = null,
        val team: String? = null,
        val type: String? = null,
        val downstream: String? = null
)

class FOAppConfig: HashMap<String, FOConfig>()
