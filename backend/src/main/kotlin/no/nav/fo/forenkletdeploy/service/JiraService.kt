package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.JiraIssue
import no.nav.fo.forenkletdeploy.consumer.JiraConsumer
import org.springframework.stereotype.Service
import javax.inject.Inject

@Service
class JiraService @Inject
constructor(
        val jiraConsumer: JiraConsumer
) {
    fun getUserStory(issueId: String): JiraIssue =
            jiraConsumer.getUserStory(issueId)
}