package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.service.JiraService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.inject.Inject

@RestController
@RequestMapping("/api/jira")
class JiraIssueResource @Inject
constructor(val jiraService: JiraService) {
    @GetMapping("/{issueid}")
    fun getJiraIssue(@PathVariable("issueid") issueid: String) =
            jiraService.getUserStory(issueid).copy(key = issueid)
}
