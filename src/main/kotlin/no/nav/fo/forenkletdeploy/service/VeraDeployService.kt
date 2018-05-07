package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.consumer.getVeraConsumer
import org.springframework.stereotype.Service
import java.util.*
import javax.inject.Inject

@Service
class VeraDeployService @Inject
constructor(
        val teamService: TeamService
) {
    val veraConsumer = getVeraConsumer()
    private val gyldigeMiljoer = Arrays.asList("p", "q0", "q6", "t6")

    fun getDeploysForTeam(teamId: String) =
            teamService.getTeam(teamId).getApplicationConfigs()
                    .map { getDeploysForApp(it.name) }

    fun getDeploysForApp(app: String) =
            veraConsumer.getDeploysForApp(app)
                    .filter { gyldigeMiljoer.contains(it.environment) }
}
