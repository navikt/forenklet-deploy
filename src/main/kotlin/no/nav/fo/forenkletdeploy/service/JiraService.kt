package no.nav.fo.forenkletdeploy.service

import no.nav.fo.forenkletdeploy.JiraIssue
import no.nav.fo.forenkletdeploy.consumer.getJiraConsumer
import org.springframework.stereotype.Service

@Service
class JiraService {
    val jiraConsumer = getJiraConsumer()

    fun getUserStory(issueId: String): JiraIssue =
            jiraConsumer.getUserStory(issueId)
}