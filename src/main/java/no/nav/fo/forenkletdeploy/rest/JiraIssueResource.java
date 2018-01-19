package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.domain.JiraIssue;
import no.nav.fo.forenkletdeploy.domain.JiraIssues;
import no.nav.fo.forenkletdeploy.service.JiraIssueService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.List;

@Path("jira")
@Component
public class JiraIssueResource {
    private final JiraIssueService jiraIssueService;

    @Inject
    JiraIssueResource(JiraIssueService jiraIssueService) {
        this.jiraIssueService = jiraIssueService;
    }

    @GET
    @Path("/")
    public List<JiraIssue> getAllFoIssues() {
        return jiraIssueService.getUserStories();
    }

    @GET
    @Path("/{issueid}")
    public JiraIssue getJiraIssue(@PathParam("issueid") String issueid) {
        JiraIssue issue = jiraIssueService.getUserStory(issueid);
        issue.key = issueid; // Av og til er issues renamet
        return issue;
    }
}
