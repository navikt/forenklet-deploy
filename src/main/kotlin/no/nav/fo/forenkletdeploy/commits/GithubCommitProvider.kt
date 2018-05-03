package no.nav.fo.forenkletdeploy.commits

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class GithubCommitProvider @Inject constructor(val stashCommitProvider: IStashCommitProvider) {
    fun getCommitsForRelease(application: ApplicationConfig, fromTag: String, toTag: String): List<Commit> =
        stashCommitProvider.getCommitsForRelease(
                fromTag = fromTag,
                toTag = toTag,
                application = ApplicationConfig(
                        gitUrl = "ssh://git@stash.devillo.no:7999/fa/${application.name}.git",
                        name = application.name
                )
        )
}