package no.nav.fo.forenkletdeploy.commits

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.consumer.getRestUriForRepo
import no.nav.fo.forenkletdeploy.service.Team
import no.nav.fo.forenkletdeploy.service.getLinkUriForCommit
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class MockTeam : Team(
        id = "mock",
        displayName = "mock",
        configUrl = "mock",
        jenkinsFolder = "mock"
)

class StashCommitProviderTest {

    @Test
    fun getCorrectRestUriForStashRepo() {
        val project = "testproject"
        val reponame = "test-repo"
        val appConfig = ApplicationConfig(
                name = "testapp",
                gitUrl = "ssh://git@stash.devillo.no:7999/$project/$reponame.git",
                team = MockTeam()
        )
        val expected = "http://stash.devillo.no/rest/api/1.0/projects/$project/repos/$reponame"
        assertThat(getRestUriForRepo(appConfig))
                .isEqualToIgnoringCase(expected)
    }

    @Test
    fun getCorrectLinkUriForStashRepo() {
        val project = "testproject"
        val reponame = "test-repo"
        val commit = "commithash"
        val appConfig = ApplicationConfig(
                name = "testapp",
                gitUrl = "ssh://git@stash.devillo.no:7999/$project/$reponame.git",
                team = MockTeam()
        )
        val expected = "http://stash.devillo.no/projects/$project/repos/$reponame/commits/$commit"
        assertThat(getLinkUriForCommit(appConfig, commit))
                .isEqualToIgnoringCase(expected)
    }
}
