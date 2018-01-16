package no.nav.fo.forenkletdeploy.domain;

public class JiraIssue {
    public String id;
    public String key;
    public JiraIssueFields fields;

    public static class JiraIssueFields {
        public JiraIssuePerson assignee;
        public String summary;
        public JiraIssueStatus status;
    }

    public static class JiraIssuePerson {
        public String displayName;
    }

    public static class JiraIssueStatus {
        public String name;
    }
}
