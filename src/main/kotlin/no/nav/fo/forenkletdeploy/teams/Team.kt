package no.nav.fo.forenkletdeploy.teams

import no.nav.fo.forenkletdeploy.ApplicationConfig

interface Team {
    val id: String
    val displayName: String
    val jenkinsFolder: String
    var applicationConfigs: List<ApplicationConfig>
    fun hentApplicationConfigs()
}