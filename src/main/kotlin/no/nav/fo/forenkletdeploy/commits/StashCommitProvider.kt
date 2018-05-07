package no.nav.fo.forenkletdeploy.commits

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.slf4j.LoggerFactory
import java.util.*

interface IStashCommitProvider {
    fun getCommitsForRelease(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit>
}

class StashCommitProvider: IStashCommitProvider {
    val LOG = LoggerFactory.getLogger(this.javaClass)
    val LIMIT = 1000

    override fun getCommitsForRelease(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            getCommits(application, fromTag, toTag)
                    .map { Commit(
                            timestamp = it.committerTimestamp,
                            author = it.author.displayName ?: it.author.name,
                            url = getLinkUriForCommit(application, it.id),
                            message = it.message,
                            hash = it.id,
                            mergecommit = it.parents.size > 1,
                            application = application.name
                    ) }

    fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<StashCommit> =
            try {
                val url = getRestUriForRepo(application)
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

class MockStashCommitProvider: IStashCommitProvider {
    override fun getCommitsForRelease(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> {
        val faker = Faker(Random(stringToSeed(application.name + fromTag + toTag)))
        val numCommits = faker.number().numberBetween(1, 8)

        return (1..numCommits).map {
            Commit(
                    hash = faker.code().imei(),
                    application = application.name,
                    url = application.gitUrl,
                    message = getMessage(faker),
                    author = faker.zelda().character(),
                    timestamp = getMinutesAgo(it * 12),
                    mergecommit = false
            )
        }
    }

    fun getMessage(faker: Faker): String =
            faker.numerify("PUS-### ${faker.gameOfThrones().city()}\n\n${faker.chuckNorris().fact()}")

    fun getMinutesAgo(minutes: Int): Long =
            (System.currentTimeMillis()) - (minutes * 60 * 1000)
}

fun getRestUriForRepo(application: ApplicationConfig): String {
    val projectRegex = "7999/([a-zA-Z]+)/".toRegex()
    val project = projectRegex.find(application.gitUrl)?.groups?.get(1)?.value
    return "http://stash.devillo.no/rest/api/1.0/projects/$project/repos/${application.name}/commits"
}

fun getLinkUriForCommit(application: ApplicationConfig, commit: String): String {
    val projectRegex = "7999/([a-zA-Z]+)/".toRegex()
    val project = projectRegex.find(application.gitUrl)?.groups?.get(1)?.value
    return "http://stash.devillo.no/projects/$project/repos/${application.name}/commits/$commit"
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
        val displayId: String,
        val id: String,
        val message: String,
        val parents: List<ParentCommit>
)

data class CommitPerson (
        val active: Boolean,
        val displayName: String?,
        val email: String?,
        val id: Int,
        val name: String,
        val slug: String?,
        val type: String?,
        val links: PersonLinks?
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