package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.Utils
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

interface GithubConsumer {
    fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<GithubCommit>
    fun getTags(application: ApplicationConfig): List<GithubTag>
}

@Service("GithubConsumer")
@Profile("!mock")
open class GithubConsumerImpl : GithubConsumer {
    val LOG = LoggerFactory.getLogger(this.javaClass)
    val LIMIT = 1000
    val TOKEN = Utils.getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")

    @Cacheable("githubcommits")
    override fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<GithubCommit> =
            try {
                val useFromTag = if (fromTag == "null") "1" else fromTag
                val useToTag = if (toTag == "null") "HEAD" else toTag

                val url = "${getRestUriForGithubRepo(application)}/compare/$useFromTag...$useToTag"
                LOG.info("Henter commits for ${application.name} ($fromTag -> $toTag) via $url")
                Utils.withClient(url)
                        .request()
                        .header("Authorization", "token ${TOKEN}")
                        .get(GithubCommits::class.java)
                        .commits
            } catch (e: Throwable) {
                LOG.error("Feil ved henting av commits for ${application.name}", e)
                emptyList()
            }


    @Cacheable("githubtags")
    override fun getTags(application: ApplicationConfig): List<GithubTag> =
            try {
                val url = "${getRestUriForRepo(application)}/tags"
                LOG.info("Henter tags for ${application.name} via $url")
                Utils.withClient(url)
                        .queryParam("limit", LIMIT)
                        .request()
                        .header("Authorization", "token $TOKEN")
                        .get(GithubTags::class.java)
                        .values
            } catch (e: Throwable) {
                LOG.error("Feil ved henting av tags for ${application.name}", e)
                emptyList()
            }
}

@Service("GithubConsumer")
@Profile("mock")
class MockGithubConsumer : GithubConsumer {
    override fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<GithubCommit> {
        val faker = Faker(Random(Utils.stringToSeed(application.name + fromTag + toTag)))
        val numCommits = faker.number().numberBetween(1, 8)

        return (1..numCommits).map {
            val person = GithubCommitPerson(
                    name = faker.gameOfThrones().character(),
                    date = getMinutesAgo(faker.number().numberBetween(it*10, it*11)),
                    email = faker.internet().safeEmailAddress()
            )
            val id = faker.code().imei()
            GithubCommit(
                    node_id = id,
                    sha = id,
                    parents = emptyList(),
                    url = "http://github.com/commit/$id",
                    commit = GithubCommitDetail(
                            author = person,
                            committer = person,
                            message = getMessage(faker),
                            url = "http://github.com/commit/$id"
                    )
            )
        }
    }

    override fun getTags(application: ApplicationConfig): List<GithubTag> {
        val faker = Faker(Random(Utils.stringToSeed(application.name)))
        val numTags = faker.number().numberBetween(8, 25)

        return (1..numTags).map {
            val id = faker.numerify("####.########.###")
            GithubTag(
                    node_id = id,
                    name = id,
                    commit = GithubTagCommit(sha = faker.code().imei(), url = "http://github.com/tag/$id")
            )
        }
    }

    fun getMinutesAgo(minutes: Int): String {
        val date = Date((System.currentTimeMillis()) - (minutes * 60 * 1000))
        val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm:ss z")
        sdf.timeZone = TimeZone.getDefault()
        return sdf.format(date)
    }


    fun getMessage(faker: Faker): String =
            faker.numerify("PUS-### ${faker.book().title()}\n\n${faker.chuckNorris().fact()}")
}

data class GithubCommits(
        val commits: List<GithubCommit>
)

data class GithubCommit(
        val node_id: String,
        val commit: GithubCommitDetail,
        val sha: String,
        val url: String,
        val parents: List<GithubParentCommit> = emptyList()
)

data class GithubCommitDetail(
        val author: GithubCommitPerson,
        val committer: GithubCommitPerson,
        val message: String,
        val url: String
)

data class GithubCommitPerson(
        val date: String,
        val email: String,
        val name: String

)

data class GithubParentCommit(
        val sha: String,
        val url: String
)

data class GithubTags(
        val values: List<GithubTag>
)

data class GithubTagCommit(
        val sha: String,
        val url: String
)

data class GithubTag(
        val name: String,
        val node_id: String,
        val commit: GithubTagCommit
)

fun getRestUriForGithubRepo(application: ApplicationConfig): String {
    return "https://api.github.com/repos/navikt/${application.name}"
}
