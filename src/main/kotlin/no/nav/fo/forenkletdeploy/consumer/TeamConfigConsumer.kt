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
    fun hentTeamConfig(uri: String): TeamAppConfigs
}

@Service
@Profile("!mock")
open class TeamConfigConsumerImpl : TeamConfigConsumer {
    val GITHUB_TOKEN = "token ${Utils.getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")}"
    val STASH_TOKEN = "Bearer ${Utils.getRequiredProperty("FD_STASH_TOKEN")}"

    @Cacheable("teamconfig")
    override fun hentTeamConfig(uri: String): TeamAppConfigs {
        val json = getConfigWithAuth(uri)
        return fromJson(json, TeamAppConfigs::class.java)
    }

    private fun getConfigWithAuth(uri: String): String {
        val token = if (uri.contains("github")) { GITHUB_TOKEN } else STASH_TOKEN
        return withClient(uri)
                .request()
                .header("Authorization", token)
                .get(String::class.java)
    }
}

@Service
@Profile("mock")
class MockTeamConfigConsumer : TeamConfigConsumer {
    override fun hentTeamConfig(uri: String): TeamAppConfigs {
        val faker = Faker(Random(stringToSeed(uri)))
        val numApps = faker.number().numberBetween(3, 10)
        val teamApps = TeamAppConfigs()
        (1..numApps).forEach {
            teamApps[faker.pokemon().name()] = TeamAppConfig("ssh://git@github.com/$it")
        }
        return teamApps
    }
}
