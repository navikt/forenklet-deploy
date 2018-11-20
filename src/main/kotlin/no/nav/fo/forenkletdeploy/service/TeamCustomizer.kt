package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit

interface ITeamCustomizer {
    fun filterCommits(commits: List<Commit>, applicationConfig: ApplicationConfig): List<Commit> = commits
}

class TeamPAMAasmundCustomizer : ITeamCustomizer {
    enum class KANDIDATSOK(val appname: String) {
        ARBEIDSGIVER("pam-kandidatsok"),
        VEILEDER("pam-kandidatsok-veileder")
    }
    override fun filterCommits(commits: List<Commit>, applicationConfig: ApplicationConfig): List<Commit> =
            when {
                applicationConfig.name == KANDIDATSOK.ARBEIDSGIVER.appname ->
                    commits.filter { it.message.contains(Regex("app:(veil,arb|arb,veil|arb)")) }

                applicationConfig.name == KANDIDATSOK.VEILEDER.appname ->
                    commits.filter { it.message.contains(Regex("app:(veil,arb|arb,veil|veil)")) }

                else ->
                    commits
            }
}
