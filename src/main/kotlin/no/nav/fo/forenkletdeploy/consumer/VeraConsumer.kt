package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.VeraDeploy
import no.nav.fo.forenkletdeploy.VeraDeploys
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.mockEnabled
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.springframework.cache.annotation.Cacheable
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*

interface IVeraConsumer {
    fun getDeploysForApp(app: String): List<VeraDeploy>
}

open class VeraConsumer: IVeraConsumer {
    @Cacheable("veradeploys")
    override fun getDeploysForApp(app: String): List<VeraDeploy> =
        withClient("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true&application=$app")
                .request()
                .get(VeraDeploys::class.java)
}

class MockVeraConsumer: IVeraConsumer {
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

fun getVeraConsumer(): IVeraConsumer =
        if (mockEnabled()) MockVeraConsumer() else VeraConsumer()
