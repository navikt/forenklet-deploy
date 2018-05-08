package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.Utils.stringToSeed
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.util.*

interface StashCommitConsumer {
    fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<StashCommit>
}

@Service
@Profile("!mock")
open class StashCommitConsumerImpl: StashCommitConsumer {
    val LOG = LoggerFactory.getLogger(this.javaClass)
    val LIMIT = 1000

    @Cacheable("stashcommits")
    override fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<StashCommit> =
            try {
                val url = application.gitUrl
                LOG.info("Henter commits for ${application.name} ($fromTag -> $toTag) via $url")
                withClient(url)
                        .queryParam("since", tagRef(fromTag))
                        .queryParam("until", tagRef(toTag))
                        .queryParam("limit", LIMIT)
                        .request()
                        .get(StashCommits::class.java)
                        .values
            } catch (e: Throwable) {
                LOG.error("Feil ved henting av commits for ${application.name}", e)
                ArrayList()
            }

    private fun tagRef(tag: String) =
            if ("null".equals(tag, ignoreCase = true)) "" else "refs%2Ftags%2F$tag"
}

@Service
@Profile("mock")
class MockStashCommitConsumer: StashCommitConsumer {
    override fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<StashCommit> {
        val faker = Faker(Random(stringToSeed(application.name + fromTag + toTag)))
        val numCommits = faker.number().numberBetween(1, 8)

        return (1..numCommits).map {
            val person = CommitPerson(
                    id = faker.number().randomDigitNotZero(),
                    name = faker.gameOfThrones().character(),
                    active = true
            )
            StashCommit(
                    id = faker.code().imei(),
                    authorTimestamp = getMinutesAgo(it * 12),
                    committerTimestamp = getMinutesAgo(it * 12),
                    message = getMessage(faker),
                    author = person,
                    committer = person
            )
        }
    }

    fun getMessage(faker: Faker): String =
            faker.numerify("PUS-### ${faker.book().title()}\n\n${faker.chuckNorris().fact()}")

    fun getMinutesAgo(minutes: Int): Long =
            (System.currentTimeMillis()) - (minutes * 60 * 1000)
}

data class StashCommits (
        val isLastPage: Boolean,
        val limit: Int,
        val nextPageStart: Int,
        val size: Int,
        val start: Int,
        val values: List<StashCommit>
)

data class StashCommit (
        val authorTimestamp: Long,
        val author: CommitPerson,
        val committerTimestamp: Long,
        val committer: CommitPerson,
        val displayId: String = "",
        val id: String,
        val message: String,
        val parents: List<ParentCommit> = ArrayList()
)

data class CommitPerson (
        val active: Boolean,
        val id: Int,
        val name: String,
        val email: String? = null,
        val displayName: String? = null,
        val slug: String? = null,
        val type: String? = null,
        val links: PersonLinks? = null
)

data class PersonLinks (
        val self: List<PersonLink>
)

data class PersonLink (
        val href: String
)

data class ParentCommit (
        val displayId: String,
        val id: String
)