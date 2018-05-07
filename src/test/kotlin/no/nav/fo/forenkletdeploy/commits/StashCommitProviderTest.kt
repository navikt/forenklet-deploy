package no.nav.fo.forenkletdeploy.commits

import no.nav.fo.forenkletdeploy.ApplicationConfig
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class StashCommitProviderTest {

    @Test
    fun getCorrectRestUriForStashRepo() {
        val project = "testproject"
        val appname = "testapp"
        val appConfig = ApplicationConfig(
                name = "testapp",
                gitUrl = "ssh://git@stash.devillo.no:7999/$project/$appname.git"
        )
        val expected = "http://stash.devillo.no/rest/api/1.0/projects/$project/repos/$appname/commits"
        assertThat(getRestUriForRepo(appConfig))
                .isEqualToIgnoringCase(expected)
    }

    @Test
    fun getCorrectLinkUriForStashRepo() {
        val project = "testproject"
        val appname = "testapp"
        val commit = "commithash"
        val appConfig = ApplicationConfig(
                name = "testapp",
                gitUrl = "ssh://git@stash.devillo.no:7999/$project/$appname.git"
        )
        val expected = "http://stash.devillo.no/projects/$project/repos/$appname/commits/$commit"
        assertThat(getLinkUriForCommit(appConfig, commit))
                .isEqualToIgnoringCase(expected)
    }
}