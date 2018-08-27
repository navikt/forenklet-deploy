package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class ApplicationService @Inject
constructor(
    val teamService: TeamService
) {
    val logger: Logger = LoggerFactory.getLogger(ApplicationService::class.java);

    fun getAllApplications() =
            teamService.allTeams.flatMap {
                try {
                    getAppsForTeam(it.id)
                } catch (e: Exception) {
                    logger.error("Kunne ikke hente appConfig for ${it.displayName} via ${it.configUrl}", e)
                    return emptyList<ApplicationConfig>()
                }
            }

    fun getAppsForTeam(teamId: String): List<ApplicationConfig> =
            teamService.getAppsForTeam(teamId)

    fun getAppByName(name: String): ApplicationConfig =
            try {
                getAllApplications().first { it.name.equals(name, ignoreCase = true) }
            } catch (e: NoSuchElementException) {
                throw RuntimeException("Kunne ikke finne '$name' blandt konfigurerte applikasjoner.", e)
            }
}