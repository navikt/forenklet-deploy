package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.ApplicationConfig
import no.nav.fo.forenkletdeploy.Commit

interface TeamCustomizer {
    fun filterCommits(commits: List<Commit>, applicationConfig: ApplicationConfig): List<Commit> = commits
}
