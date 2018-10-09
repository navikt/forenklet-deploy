package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.GitTag
import no.nav.fo.forenkletdeploy.consumer.GithubConsumer
import no.nav.fo.forenkletdeploy.consumer.StashConsumer
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import javax.inject.Inject
import javax.inject.Named

@Service
open class GitService @Inject
constructor(
        val stashConsumer: StashConsumer,
        val githubConsumer: GithubConsumer
) {
    fun getCommitsForRelease(application: ApplicationConfig, fromVersion: String, toVersion: String): List<Commit> {
        if (isGithubRepo(application.gitUrl)) {
            return getGithubCommits(application, fromVersion, toVersion)
        }
        return getStashCommits(application, fromVersion, toVersion)
    }

    fun getTagsForApplication(application: ApplicationConfig): List<GitTag> {
        if (isGithubRepo(application.gitUrl)) {
            return getGithubTags(application)
        }
        return getStashTags(application)
    }

    private fun getStashCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            stashConsumer.getCommits(application, fromTag, toTag)
                    .map { Commit(
                            timestamp = it.committerTimestamp,
                            author = it.author.displayName ?: it.author.name,
                            url = getLinkUriForCommit(application, it.id),
                            message = it.message,
                            hash = it.id,
                            mergecommit = it.parents.size > 1,
                            application = application.name
                    ) }

    private fun getGithubCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            githubConsumer.getCommits(application, fromTag, toTag)
                .map { Commit(
                    timestamp = githubTimestampToUnixtimestamp(it.commit.committer.date),
                    author = it.commit.author.name,
                    url = getLinkUriForGithubCommit(application, it.sha),
                    message = it.commit.message,
                    hash = it.sha,
                    mergecommit = it.parents.size > 1,
                    application = application.name
                )}

    private fun githubTimestampToUnixtimestamp(githubTS: String): Long {
        val dt = LocalDateTime.parse(githubTS, DateTimeFormatter.ISO_DATE_TIME)
        return dt.atZone(ZoneId.systemDefault()).toEpochSecond() * 1000
    }


    private fun getStashTags(application: ApplicationConfig): List<GitTag> =
            stashConsumer.getTags(application)
                    .map { GitTag(
                            displayId = it.displayId,
                            latestcommit = it.latestCommit,
                            application = application.name
                    ) }

    private fun getGithubTags(application: ApplicationConfig): List<GitTag> =
            githubConsumer.getTags(application)
                .map { GitTag(
                        displayId = it.name,
                        latestcommit = it.commit.sha,
                        application = application.name
                ) }

    private fun getGithubConfig(application: String): ApplicationConfig =
            ApplicationConfig(
                    gitUrl = "ssh://git@stash.devillo.no:7999/fa/$application.git",
                    name = application
            )

    private fun isGithubRepo(repoUri: String): Boolean =
            repoUri.contains("github.com")
}
private fun getLinkUriForGithubCommit(application: ApplicationConfig, id: String): String {
    return "https://github.com/navikt/${application.name}/commit/${id}"
}

fun getLinkUriForCommit(application: ApplicationConfig, commit: String): String {
    val projectRegex = "7999/([a-zA-Z]+)/([a-zA-Z]+)".toRegex()
    val groups = projectRegex.find(application.gitUrl)?.groups
    val project = groups?.get(1)?.value
    val repo = groups?.get(2)?.value
    return "http://stash.devillo.no/projects/$project/repos/${repo}/commits/$commit"
}