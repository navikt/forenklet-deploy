package no.nav.fo.forenkletdeploy.service

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.*
import org.springframework.stereotype.Service

import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.springframework.cache.annotation.Cacheable
import java.util.*

interface IJiraIssueService {
    fun getUserStories(): List<JiraIssue>
    fun getUserStory(issueId: String): JiraIssue
}

open class JiraIssueService: IJiraIssueService {
    val IKKE_INTERESSANTE_STATUSER = arrayOf(
        "Analyse",
        "Verifisering",
        "Klar til utvikling",
        "Ferdig"
    ).joinToString(separator = ",")
    val FO_JQL = "project=fo AND status not in ($IKKE_INTERESSANTE_STATUSER)"

    @Cacheable("jiraissues")
    override fun getUserStories(): List<JiraIssue> =
            withClient("https://jira.adeo.no/rest/api/2/search")
                    .queryParam("jql", FO_JQL)
                    .queryParam("maxResults", 500)
                    .request()
                    .get(JiraIssues::class.java)
                    .issues

    @Cacheable("jiraissue")
    override fun getUserStory(issueId: String): JiraIssue =
            withClient("https://jira.adeo.no/rest/api/2/issue/$issueId")
                    .request()
                    .get(JiraIssue::class.java)
}

class MockJiraIssueService: IJiraIssueService {
    val STATUSKODER = arrayOf(
            "Under utvikling",
            "Fagfellevurdering",
            "Test 1",
            "Test 2"
    )

    override fun getUserStories(): List<JiraIssue> =
            (123..130).map { getUserStory("PUS-$it") }

    override fun getUserStory(issueId: String): JiraIssue {
        val faker = Faker(Random(stringToSeed(issueId)))
        return JiraIssue(
                id = issueId,
                key = issueId,
                fields = JiraIssueFields(
                        assignee = JiraIssuePerson(displayName = faker.pokemon().name()),
                        summary = faker.rickAndMorty().quote(),
                        status = JiraIssueStatus(
                                name = STATUSKODER[faker.number().numberBetween(0, STATUSKODER.size-1)]
                        )
                )
        )
    }

}