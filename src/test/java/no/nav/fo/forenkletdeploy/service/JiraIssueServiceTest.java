package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.TestUtils;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class JiraIssueServiceTest {
    JiraIssueService jiraIssueService = new JiraIssueService();

    @Before
    public void setup() {
        TestUtils.setupContext();
    }

    @Test
    public void getUserStories() {
        assertThat(jiraIssueService.getUserStories()).isNotEmpty();
    }
}