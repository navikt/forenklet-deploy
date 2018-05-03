package no.nav.fo.forenkletdeploy.service

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.VeraDeploy
import no.nav.fo.forenkletdeploy.VeraDeploys
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*
import javax.inject.Inject

interface IVeraDeployService {
    fun getVeraDeploys(): List<VeraDeploy>
}

open class VeraDeployService: IVeraDeployService {
    val LOG: Logger = LoggerFactory.getLogger(this.javaClass)

    @Cacheable("veradeploys")
    override fun getVeraDeploys(): List<VeraDeploy> {
        return try {
            withClient("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                    .request()
                    .get(VeraDeploys::class.java)
        } catch (e: Exception) {
            LOG.error("Kunne ikke hente deploys fra vera", e)
            ArrayList()
        }
    }
}

@Service
class MockVeraDeployService @Inject
constructor(
        val applicationService: IApplicationService
): IVeraDeployService {
    val MILJO = arrayOf("t6", "q6", "q0", "p")

    override fun getVeraDeploys() =
        applicationService.getAllAppConfigurations().flatMap { getDeploysForApp(it.name) }

    fun getDeploysForApp(application: String): List<VeraDeploy> {
        val faker = Faker(Random(stringToSeed(application)))
        return MILJO.map {
            VeraDeploy(
                id = faker.number().randomDigit().toString(),
                application = application,
                version = faker.numerify("###.#####.####"),
                deployed_timestamp = getMinutesAgo(faker.number().numberBetween(12, 180)),
                environment = it
        ) }
    }


    private fun getMinutesAgo(minutes: Int): ZonedDateTime {
        val instant = Instant.ofEpochMilli(System.currentTimeMillis() - minutes * 60 * 1000)
        return instant.atZone(ZoneId.of("Europe/Oslo"))
    }
}


