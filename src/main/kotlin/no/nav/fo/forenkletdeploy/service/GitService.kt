package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.GitTag
import no.nav.fo.forenkletdeploy.consumer.StashConsumer
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
open class GitService @Inject
constructor(
        val stashConsumer: StashConsumer
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
            getStashCommits(
                    fromTag = fromTag,
                    toTag = toTag,
                    application = getGithubConfig(application.name)
            )

    private fun getStashTags(application: ApplicationConfig): List<GitTag> =
            stashConsumer.getTags(application)
                    .map { GitTag(
                            displayId = it.displayId,
                            latestcommit = it.latestCommit,
                            application = application.name
                    ) }

    private fun getGithubTags(application: ApplicationConfig): List<GitTag> =
            getStashTags(getGithubConfig(application.name))

    private fun getGithubConfig(application: String): ApplicationConfig =
            ApplicationConfig(
                    gitUrl = "ssh://git@stash.devillo.no:7999/fa/$application.git",
                    name = application
            )

    private fun isGithubRepo(repoUri: String): Boolean =
            repoUri.contains("github.com")
}

fun getLinkUriForCommit(application: ApplicationConfig, commit: String): String {
    val projectRegex = "7999/([a-zA-Z]+)/".toRegex()
    val project = projectRegex.find(application.gitUrl)?.groups?.get(1)?.value
    return "http://stash.devillo.no/projects/$project/repos/${application.name}/commits/$commit"
}