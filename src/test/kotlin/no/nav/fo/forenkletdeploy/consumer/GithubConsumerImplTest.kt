package no.nav.fo.forenkletdeploy.consumer

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.service.Team
import org.junit.Test

class MockTeam : Team(
        id = "mock",
        displayName = "mock",
        configUrl = "mock",
        jenkinsFolder = "mock"
)

class GithubConsumerImplTest {
    @Test
    fun getRestUriForGithubRepoShouldWorkForHttpsUri() {
        val app = ApplicationConfig(name = "fo-feature", gitUrl = "https://github.com/navikt/fo-feature.git", team = MockTeam())
        val expected = "https://api.github.com/repos/navikt/fo-feature"
        kotlin.test.assertEquals(expected, getApiUriForGithubRepo(app))
    }

    @Test
    fun getRestUriForGithubRepoShouldWorkForSshUri() {
        val app = ApplicationConfig(name = "fo-feature", gitUrl = "git@github.com:navikt/fo-feature.git", team = MockTeam())
        val expected = "https://api.github.com/repos/navikt/fo-feature"
        kotlin.test.assertEquals(expected, getApiUriForGithubRepo(app))
    }

    @Test
    fun getRestUriForGithubRepoShouldFallbackToApplicationName() {
        val app = ApplicationConfig(name = "testName", gitUrl = "git@github.com:etse/test-repo", team = MockTeam())
        val expected = "https://api.github.com/repos/navikt/testName"
        kotlin.test.assertEquals(expected, getApiUriForGithubRepo(app))
    }
}
