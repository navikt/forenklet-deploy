package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.consumer.GithubConsumer
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import javax.inject.Inject

@Service
open class GitService @Inject
constructor(
        val githubConsumer: GithubConsumer
) {

    fun ping() {
        githubConsumer.ping()
    }

    fun getCommitsForRelease(application: ApplicationConfig, fromVersion: String, toVersion: String): List<Commit> {
        return getGithubCommits(application, fromVersion, toVersion)
    }

    private fun getGithubCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            githubConsumer.getCommits(application, fromTag, toTag)
                    .map {
                        Commit(
                                timestamp = githubTimestampToUnixtimestamp(it.commit.committer.date),
                                author = it.commit.author.name,
                                url = getLinkUriForGithubCommit(application, it.sha),
                                message = it.commit.message,
                                hash = it.sha,
                                mergecommit = it.parents.size > 1,
                                application = application.name
                        )
                    }

    private fun githubTimestampToUnixtimestamp(githubTS: String): Long {
        val dt = LocalDateTime.parse(githubTS, DateTimeFormatter.ISO_DATE_TIME)
        return dt.atZone(ZoneId.systemDefault()).toEpochSecond() * 1000
    }
}

private fun getLinkUriForGithubCommit(application: ApplicationConfig, id: String): String {
    return "https://github.com/navikt/${application.name}/commit/${id}"
}
