package no.nav.fo.forenkletdeploy.service

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.provider.TeamProvider
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.scheduling.annotation.Scheduled
import java.util.*
import javax.inject.Inject

interface IApplicationService {
    fun getApps(): List<ApplicationConfig>
    fun getAppsByTeam(teamId: String): List<ApplicationConfig>
    fun getAppByName(name: String): ApplicationConfig?
    fun getAllAppConfigurations(): List<ApplicationConfig>
    fun lastAlleApplicationConfigs() {

    }
}

open class ApplicationService @Inject
constructor(
        val teamProvider: TeamProvider
): IApplicationService {
    val logger = LoggerFactory.getLogger(this.javaClass.name)

    @Cacheable("applicationlist")
    override fun getApps(): List<ApplicationConfig> =
            getAllAppConfigurations()

    @Cacheable("applicationlistbyteam")
    override fun getAppsByTeam(teamId: String): List<ApplicationConfig> =
            teamProvider.teams
                .filter { it.id == teamId }
                .flatMap { it.applicationConfigs }

    @Cacheable("appbyname")
    override fun getAppByName(name: String): ApplicationConfig {
        return getAllAppConfigurations()
                .first { it.name.equals(name, ignoreCase = true) }
    }

    @Scheduled(fixedRate = 10 * 60 * 1000)
    override fun lastAlleApplicationConfigs() {
        logger.info("Henter og oppdaterer alle applicationConfigs")
        teamProvider.teams.forEach({ it.hentApplicationConfigs() })
    }

    override fun getAllAppConfigurations(): List<ApplicationConfig> =
            teamProvider.teams.flatMap { it.applicationConfigs }
}

class MockApplicationService @Inject
constructor(
        val teamProvider: TeamProvider
): IApplicationService {

    override fun getApps(): List<ApplicationConfig> =
            getAllAppConfigurations()

    override fun getAppsByTeam(teamId: String): List<ApplicationConfig> {
        val faker = Faker(Random(stringToSeed(teamId)))
        val numApps = faker.number().numberBetween(3, 10)
        return (1..numApps).map { getAppByName(faker.zelda().game()) }
    }

    override fun getAppByName(name: String): ApplicationConfig =
            ApplicationConfig(name = name, gitUrl = "ssh://git@github.com/$name")

    override fun getAllAppConfigurations(): List<ApplicationConfig> =
            teamProvider.teams.flatMap { getAppsByTeam(it.id) }
}
