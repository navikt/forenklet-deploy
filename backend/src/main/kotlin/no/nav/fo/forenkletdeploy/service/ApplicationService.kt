package no.nav.fo.forenkletdeploy.service

import arrow.core.Try
import arrow.core.getOrElse
import arrow.core.orNull
import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.flatMapParallell
import org.springframework.stereotype.Service
import java.util.Collections.singletonList
import javax.inject.Inject


@Service
class ApplicationService @Inject
constructor(
        private val teamService: TeamService
) {

    fun getAllApplications(): List<Try<ApplicationConfig>> {
        return teamService.allTeams.flatMapParallell { getAppsForTeam(it) }
    }

    fun getAppByName(name: String): ApplicationConfig? = getAllApplications()
            .map { it.orNull() }
            .firstOrNull { it != null && it.name.equals(name, ignoreCase = true) }

    private fun getAppsForTeam(team: Team): List<Try<ApplicationConfig>> {
        return Try.invoke { teamService.getAppsForTeam(team.id) }
                .map { applicationConfigs -> applicationConfigs.map { Try.just(it) } }
                .getOrElse { singletonList(Try.raise(it)) }
    }

}

