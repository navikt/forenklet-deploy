package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.JiraIssue
import no.nav.fo.forenkletdeploy.service.IJiraIssueService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.inject.Inject

@RestController
@RequestMapping("/api/jira")
class JiraIssueResource @Inject
constructor(val jiraIssueService: IJiraIssueService) {

    @GetMapping("/")
    fun allFoIssues(): List<JiraIssue> =
            jiraIssueService.getUserStories()

    @GetMapping("/{issueid}")
    fun getJiraIssue(@PathVariable("issueid") issueid: String) =
            jiraIssueService.getUserStory(issueid).copy(key = issueid)
}
