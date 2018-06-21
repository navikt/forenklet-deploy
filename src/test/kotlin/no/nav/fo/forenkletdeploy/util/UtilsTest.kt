package no.nav.fo.forenkletdeploy.util

import no.nav.fo.forenkletdeploy.ApplicationConfig
import org.junit.Test
import kotlin.test.assertEquals

class UtilsTest {
    @Test
    fun getRestUriForGithubRepoShouldWorkForHttpsUri() {
        val app = ApplicationConfig(name = "fo-feature", gitUrl = "https://github.com/navikt/fo-feature.git")
        val expected = "https://api.github.com/repos/navikt/fo-feature"
        assertEquals(expected, Utils.getRestUriForGithubRepo(app))
    }

    @Test
    fun getRestUriForGithubRepoShouldWorkForSshUri() {
        val app = ApplicationConfig(name = "fo-feature", gitUrl = "git@github.com:navikt/fo-feature.git")
        val expected = "https://api.github.com/repos/navikt/fo-feature"
        assertEquals(expected, Utils.getRestUriForGithubRepo(app))
    }

    @Test
    fun getRestUriForGithubRepoShouldFallbackToApplicationName() {
        val app = ApplicationConfig(name = "testName", gitUrl = "git@github.com:etse/test-repo")
        val expected = "https://api.github.com/repos/navikt/testName"
        assertEquals(expected, Utils.getRestUriForGithubRepo(app))
    }
}