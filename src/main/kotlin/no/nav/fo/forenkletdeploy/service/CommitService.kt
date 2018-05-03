package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.commits.GithubCommitProvider
import no.nav.fo.forenkletdeploy.commits.IStashCommitProvider
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
open class CommitService @Inject constructor(
        val githubCommitProvider: GithubCommitProvider,
        val stashCommitProvider: IStashCommitProvider
) {
    @Cacheable(value = "commits", keyGenerator = "cacheKeygenerator")
    open fun getCommitsForRelease(application: ApplicationConfig, fromVersion: String, toVersion: String): List<Commit> {
        if (isGithubCommit(application.gitUrl)) {
            return githubCommitProvider.getCommitsForRelease(application, fromVersion, toVersion)
        }
        return stashCommitProvider.getCommitsForRelease(application, fromVersion, toVersion)
    }

    private fun isGithubCommit(repoUri: String): Boolean =
            repoUri.contains("github.com")
}