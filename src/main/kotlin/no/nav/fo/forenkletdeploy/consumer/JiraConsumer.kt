package no.nav.fo.forenkletdeploy.consumer

import com.github.javafaker.Faker
import no.nav.fo.forenkletdeploy.JiraIssue
import no.nav.fo.forenkletdeploy.JiraIssueFields
import no.nav.fo.forenkletdeploy.JiraIssuePerson
import no.nav.fo.forenkletdeploy.JiraIssueStatus
import no.nav.fo.forenkletdeploy.util.Utils.stringToSeed
import no.nav.fo.forenkletdeploy.util.Utils.withClient
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import java.util.*

interface JiraConsumer {
    fun getUserStory(issueId: String): JiraIssue
}

@Service
@Profile("!mock")
open class JiraConsumerImpl: JiraConsumer {
    @Cacheable("jiraissue")
    override fun getUserStory(issueId: String): JiraIssue =
            withClient("https://jira.adeo.no/rest/api/2/issue/$issueId")
                    .request()
                    .get(JiraIssue::class.java)

}

@Service
@Profile("mock")
class MockJiraConsumer: JiraConsumer {
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
                        assignee = JiraIssuePerson(displayName = faker.harryPotter().character()),
                        summary = faker.harryPotter().book(),
                        status = JiraIssueStatus(
                                name = STATUSKODER[faker.number().numberBetween(0, STATUSKODER.size-1)]
                        )
                )
        )
    }
}
