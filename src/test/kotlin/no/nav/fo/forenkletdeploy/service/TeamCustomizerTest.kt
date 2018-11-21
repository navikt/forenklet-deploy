package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit
import no.nav.fo.forenkletdeploy.service.TeamPAMAasmundCustomizer.KANDIDATSOK.*
import org.junit.Test


class TeamCustomizerTest {
    @Test
    fun kandidatsokArbeidsgiverFiltererIkkeUtCommitsMedArbeidsgiverTag() {
        val commits = listOf(commitMedArbeidsgiverTag, commitMedArbeidsgiverVeilederTag, commitMedVeilederArbeidsgiverTag)
        kotlin.test.assertEquals(commits.size, team.customizer!!.filterCommits(commits, kandidatsokArbeidsgiver).size)
    }

    @Test
    fun kandidatsokArbeidsgiverFiltererUtCommitsUtenArbeidsgiverTag() {
        val commits = listOf(commitMedVeilederTag, commitUtenTag)
        kotlin.test.assertEquals(0, team.customizer!!.filterCommits(commits, kandidatsokArbeidsgiver).size)
    }

    @Test
    fun kandidatsokVeilederFiltererIkkeUtCommitsMedVeilederTag() {
        val commits = listOf(commitMedVeilederTag, commitMedArbeidsgiverVeilederTag, commitMedVeilederArbeidsgiverTag)
        kotlin.test.assertEquals(commits.size, team.customizer!!.filterCommits(commits, kandidatsokVeileder).size)
    }

    @Test
    fun kandidatsokVeilederFiltererUtCommitsUtenVeilederTag() {
        val commits = listOf(commitMedArbeidsgiverTag, commitUtenTag)
        kotlin.test.assertEquals(0, team.customizer!!.filterCommits(commits, kandidatsokVeileder).size)
    }

    @Test
    fun andreApplikasjonerSineCommitsFiltreresIkkeUt() {
        val commits = listOf(commitMedVeilederTag, commitMedArbeidsgiverTag, commitMedArbeidsgiverVeilederTag, commitMedVeilederArbeidsgiverTag, commitUtenTag)
        kotlin.test.assertEquals(commits.size, team.customizer!!.filterCommits(commits, annenApp).size)
    }

    companion object {
        val team = TeamPAMAasmund()
        val kandidatsokArbeidsgiver = ApplicationConfig(ARBEIDSGIVER.appname, "mock", team)
        val kandidatsokVeileder = ApplicationConfig(VEILEDER.appname, "mock", team)
        val annenApp = ApplicationConfig("mock-app", "mock", team)

        val commitMedArbeidsgiverTag = commitWithMessage("Test commit app:arb")
        val commitMedVeilederTag = commitWithMessage("Test commit app:veil")
        val commitMedVeilederArbeidsgiverTag = commitWithMessage("Test commit app:veil,arb")
        val commitMedArbeidsgiverVeilederTag = commitWithMessage("Test commit \napp:arb,veil")
        val commitUtenTag = commitWithMessage("Test commit")

        private fun commitWithMessage(message: String): Commit =
                Commit(
                        message = message,
                        hash = "mock",
                        application = "mock",
                        url = "mock",
                        timestamp = 1,
                        author = "McOck"
                )
    }
}
