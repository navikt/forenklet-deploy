package no.nav.fo.forenkletdeploy.consumer

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.util.Utils
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

@Service("GithubConsumer")
@Profile("!mock")
open class GithubConsumer : StashConsumer {
    val LOG = LoggerFactory.getLogger(this.javaClass)
    val LIMIT = 1000
    val TOKEN = Utils.getRequiredProperty("GITHUB_JENKINSPUS_TOKEN")

    @Cacheable("githubcommits")
    override fun getCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<StashCommit> =
            try {
                val useFromTag = if (fromTag == null || fromTag == "null") "1" else "${fromTag}"
                val useToTag = if (toTag == null || toTag == "null") "HEAD" else "${toTag}"

                val url = "${getRestUriForGithubRepo(application)}/compare/${useFromTag}...${useToTag}"
                LOG.info("Henter commits for ${application.name} ($fromTag -> $toTag) via $url")
                Utils.withClient(url)
                        .request()
                        .header("Authorization", "token ${TOKEN}")
                        .get(GithubCommits::class.java)
                        .commits
                        .map { StashCommit(
                                id = it.sha,
                                author = CommitPerson(true, 1,
                                        it.commit.author.name, it.commit.author.email, it.commit.author.name, null, null, null),
                                authorTimestamp = toTimestamp(it.commit.author.date),
                                committer = CommitPerson(true, 1,
                                        it.commit.committer.name, it.commit.committer.email, it.commit.committer.name, null, null, null),
                                committerTimestamp = toTimestamp(it.commit.committer.date),
                                message = it.commit.message,
                                displayId = "",
                                parents = it.parents
                                        .map { ParentCommit(it.url, it.sha) }
                        ) }
            } catch (e: Throwable) {
                LOG.error("Feil ved henting av commits for ${application.name}", e)
                ArrayList()
            }


    @Cacheable("githubtags")
    override fun getTags(application: ApplicationConfig): List<StashTag> =
            try {
                val url = "${getRestUriForRepo(application)}/tags"
                LOG.info("Henter tags for ${application.name} via $url")
                Utils.withClient(url)
                        .queryParam("limit", LIMIT)
                        .request()
                        .header("Authorization", "token ${TOKEN}")
                        .get(GithubTags::class.java)
                        .values
                        .map {StashTag(
                                displayId = it.name,
                                id = it.node_id,
                                latestCommit = it.commit.sha,
                                latestChangeset = it.commit.sha
                        )}
            } catch (e: Throwable) {
                LOG.error("Feil ved henting av tags for ${application.name}", e)
                ArrayList()
            }

    private fun tagRef(tag: String) =
            if ("null".equals(tag, ignoreCase = true)) "" else "refs%2Ftags%2F$tag"
}

data class GithubCommits (
        val commits: List<GithubCommit>
)

data class GithubCommit (
        val node_id: String,
        val commit: GithubCommitDetail,
        val sha: String,
        val url: String,
        val parents: List<GithubParentCommit> = ArrayList()
)

data class GithubCommitDetail (
        val author: GithubCommitPerson,
        val committer: GithubCommitPerson,
        val message: String,
        val url: String
)
data class GithubCommitPerson (
    val date: String,
    val email: String,
    val name : String

)
data class GithubParentCommit (
        val sha: String,
        val url: String
)

data class GithubTags (
        val values: List<GithubTag>
)

data class GithubTagCommit (
    val sha: String,
    val url: String
)

data class GithubTag (
        val name: String,
        val node_id: String,
        val commit: GithubTagCommit
)

fun toTimestamp(githubTimestamp: String): Long {
    val dt = LocalDateTime.parse(githubTimestamp, DateTimeFormatter.ISO_DATE_TIME)
    return dt.atZone(ZoneId.systemDefault()).toEpochSecond()*1000
}

fun getRestUriForGithubRepo(application: ApplicationConfig): String {
    val projectRegex = "/\\/(.+)\\/(.+).git/".toRegex()
    val project = projectRegex.find(application.gitUrl)?.groups?.get(1)?.value
    return "https://api.github.com/repos/navikt/${application.name}"
}
