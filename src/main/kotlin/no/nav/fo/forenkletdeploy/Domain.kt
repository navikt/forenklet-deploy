package no.nav.fo.forenkletdeploy

import java.time.ZonedDateTime

data class ApplicationConfig(val name: String, val gitUrl: String)
data class FeatureToggle(val name: String, val enabled: Boolean)
data class Team(val id: String, val displayName: String, val jenkinsFolder: String, val jenkinsUrl: String, val provideVersion: Boolean)

data class VeraDeploy(
        val id: String = "",
        val application: String = "",
        val deployed_timestamp: ZonedDateTime? = null,
        val version: String = "",
        val environment: String = "",
        val deployer: String = "",
        val environmentClass: String? = null,
        val replaced_timestamp: String? = null
)

class VeraDeploys : ArrayList<VeraDeploy>()

data class Commit(
        val hash: String,
        val application: String,
        val message: String,
        val url: String,
        val timestamp: Long,
        val author: String,
        val mergecommit: Boolean = false
)

data class GitTag(
        val displayId: String,
        val latestcommit: String,
        val application: String
)

data class JiraIssuePerson(val displayName: String)
data class JiraIssueStatus(val name: String)
data class JiraIssueFields(
        val assignee: JiraIssuePerson? = null,
        val summary: String,
        val status: JiraIssueStatus
)
data class JiraIssue(val id: String, val key: String, val fields: JiraIssueFields)

data class TeamAppConfig(
        val gitUrl: String
)

class TeamAppConfigs: HashMap<String, TeamAppConfig>()