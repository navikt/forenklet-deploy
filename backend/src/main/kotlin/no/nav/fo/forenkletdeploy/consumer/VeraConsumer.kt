package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.VeraDeploy
import no.nav.fo.forenkletdeploy.VeraDeploys
import no.nav.fo.forenkletdeploy.util.Utils.stringToSeed
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*

interface VeraConsumer {
    fun getDeploysForApp(app: String): List<VeraDeploy>
}

@Service
@Profile("!mock")
open class VeraConsumerImpl: VeraConsumer {
    private var nextUpdate = LocalDateTime.now()
    private var latestDeploys = getLatestDeploys()

    @Cacheable("veradeploys")
    override fun getDeploysForApp(app: String): List<VeraDeploy> =
        getLatestDeploys()
                .filter { it.application.equals(app, ignoreCase = true) }

    private fun getLatestDeploys(): List<VeraDeploy> {
        if (LocalDateTime.now() > nextUpdate) {
            latestDeploys = withClient("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                    .request()
                    .get(VeraDeploys::class.java)
            nextUpdate = LocalDateTime.now().plusMinutes(3)
        }
        return latestDeploys
    }
}

@Service
@Profile("mock")
class MockVeraConsumer: VeraConsumer {
    val MILJO = arrayOf("t6", "q6", "q0", "p")

    override fun getDeploysForApp(app: String): List<VeraDeploy> {
        val faker = Faker(Random(stringToSeed(app)))
        return MILJO.map {
            VeraDeploy(
                    id = faker.number().randomDigitNotZero().toString(),
                    application = app,
                    version = faker.numerify("###.########.####"),
                    deployed_timestamp = getMinutesAgo(faker.number().numberBetween(12, 180)),
                    environment = it
            )
        }
    }

    private fun getMinutesAgo(minutes: Int): ZonedDateTime {
        val instant = Instant.ofEpochMilli(System.currentTimeMillis() - minutes * 60 * 1000)
        return instant.atZone(ZoneId.of("Europe/Oslo"))
    }
}
