package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.TeamAppConfig
import no.nav.fo.forenkletdeploy.TeamAppConfigs
import no.nav.fo.forenkletdeploy.util.Utils
import no.nav.fo.forenkletdeploy.util.Utils.fromJson
import no.nav.fo.forenkletdeploy.util.Utils.stringToSeed
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.util.*

interface TeamConfigConsumer {
    fun hentTeamConfig(uri: String, useAuth: Boolean = false): TeamAppConfigs
}

@Service
@Profile("!mock")
open class TeamConfigConsumerImpl: TeamConfigConsumer {
    val TOKEN = Utils.getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")

    @Cacheable("teamconfig")
    override fun hentTeamConfig(uri: String, useAuth: Boolean): TeamAppConfigs {
        val json = if (useAuth) getConfigWithAuth(uri) else getConfigNoAuth(uri)
        return fromJson(json, TeamAppConfigs::class.java)
    }

    private fun getConfigWithAuth(uri: String) =
            withClient(uri)
                    .request()
                    .header("Authorization", "token $TOKEN")
                    .get(String::class.java)

    private fun getConfigNoAuth(uri: String) =
            withClient(uri).request().get(String::class.java)
}

@Service
@Profile("mock")
class MockTeamConfigConsumer: TeamConfigConsumer {
    override fun hentTeamConfig(uri: String, useAuth: Boolean): TeamAppConfigs {
        val faker = Faker(Random(stringToSeed(uri)))
        val numApps = faker.number().numberBetween(3, 10)
        val teamApps = TeamAppConfigs()
        (1..numApps).forEach {
            teamApps[faker.pokemon().name()] = TeamAppConfig("ssh://git@github.com/$it")
        }
        return teamApps
    }
}
