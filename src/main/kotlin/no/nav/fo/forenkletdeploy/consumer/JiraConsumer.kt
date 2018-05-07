package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.JiraIssue
import no.nav.fo.forenkletdeploy.JiraIssueFields
import no.nav.fo.forenkletdeploy.JiraIssuePerson
import no.nav.fo.forenkletdeploy.JiraIssueStatus
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import no.nav.fo.forenkletdeploy.util.mockEnabled
import no.nav.fo.forenkletdeploy.util.stringToSeed
import org.springframework.cache.annotation.Cacheable
import java.util.*

interface IJiraConsumer {
    fun getUserStory(issueId: String): JiraIssue
}

open class JiraConsumer: IJiraConsumer {
    val IKKE_INTERESSANTE_STATUSER = arrayOf(
            "Analyse",
            "Verifisering",
            "Klar til utvikling",
            "Ferdig"
    ).joinToString(separator = ",")
    val FO_JQL = "project=fo AND status not in ($IKKE_INTERESSANTE_STATUSER)"

    @Cacheable("jiraissue", keyGenerator = "cacheKeygenerator")
    override fun getUserStory(issueId: String): JiraIssue =
            withClient("https://jira.adeo.no/rest/api/2/issue/$issueId")
                    .request()
                    .get(JiraIssue::class.java)

}

class MockJiraConsumer: IJiraConsumer {
    val STATUSKODER = arrayOf(
            "Under utvikling",
            "Fagfellevurdering",
            "Test 1",
            "Test 2"
    )

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

fun getJiraConsumer(): IJiraConsumer =
        if (mockEnabled()) MockJiraConsumer() else JiraConsumer()
