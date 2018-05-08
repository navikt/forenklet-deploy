package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.TeamAppConfig
import no.nav.fo.forenkletdeploy.TeamAppConfigs
import no.nav.fo.forenkletdeploy.util.Utils
import no.nav.fo.forenkletdeploy.util.Utils.fromJson
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.mockEnabled
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.springframework.cache.annotation.Cacheable
import java.util.*

interface ITeamConfigConsumer {
    fun hentTeamConfig(uri: String, useAuth: Boolean = false): TeamAppConfigs
}

open class TeamConfigConsumer: ITeamConfigConsumer {
    val TOKEN = Utils.getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")

    @Cacheable("teamconfig", key = "#uri")
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


class MockTeamConfigConsumer: ITeamConfigConsumer {
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

fun getTeamConfigConsumer(): ITeamConfigConsumer =
        if (mockEnabled()) MockTeamConfigConsumer() else TeamConfigConsumer()
