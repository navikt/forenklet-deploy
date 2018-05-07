package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.consumer.getStashCommitConsumer
import org.springframework.stereotype.Service

@Service
open class CommitService {
    val stashCommitConsumer = getStashCommitConsumer()

    fun getCommitsForRelease(application: ApplicationConfig, fromVersion: String, toVersion: String): List<Commit> {
        if (isGithubCommit(application.gitUrl)) {
            return getGithubCommits(application, fromVersion, toVersion)
        }
        return getStashCommits(application, fromVersion, toVersion)
    }

    fun getStashCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            stashCommitConsumer.getCommits(application.copy(gitUrl = getRestUriForRepo(application)), fromTag, toTag)
                    .map { Commit(
                            timestamp = it.committerTimestamp,
                            author = it.author.displayName ?: it.author.name,
                            url = getLinkUriForCommit(application, it.id),
                            message = it.message,
                            hash = it.id,
                            mergecommit = it.parents.size > 1,
                            application = application.name
                    ) }

    fun getGithubCommits(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
            getStashCommits(
                    fromTag = fromTag,
                    toTag = toTag,
                    application = ApplicationConfig(
                            gitUrl = "ssh://git@stash.devillo.no:7999/fa/${application.name}.git",
                            name = application.name
                    )
            )

    private fun isGithubCommit(repoUri: String): Boolean =
            repoUri.contains("github.com")
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