package no.nav.fo.forenkletdeploy.domain;

import no.nav.fo.forenkletdeploy.jira.*;
import no.nav.fo.forenkletdeploy.vera.VeraDeploy;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;
import static no.nav.json.JsonUtils.fromJson;
import static no.nav.sbl.rest.RestUtils.withClient;

@Component
public class StatusProvider {

    // https://jira.adeo.no/secure/RapidBoard.jspa?rapidView=11947
    private static final List<String> IKKE_INTERESSANTE_STATUSER = Arrays.asList(
            "Produktkø",
            "Analyse",
            "Verifisering",
            "Klar til utvikling",

            "Ferdig"
    );
    public static final String IKKE_INTERESSANTE_STATUSER_FORMATTERT = IKKE_INTERESSANTE_STATUSER.stream().map(s -> "'" + s + "'").collect(Collectors.joining(","));
    public static final String FO_JQL = "project=fo AND status not in (" + IKKE_INTERESSANTE_STATUSER_FORMATTERT + ")";
    public static final String JIRA_USERNAME_PROPERTY_NAME = "jira.username";
    public static final String JIRA_PASSWORD_PROPERTY_NAME = "jira.password";
    public static final int LIMIT = 50;

    List<ApplicationConfig> relevantApplications = null;

    @SuppressWarnings("unchecked")
    Stream<Event> getVeraDeploys() {
        return withClient(c -> c.target("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                .request()
                .get(VeraDeploy.VeraDeploys.class))
                .stream()
                .map(this::veraDeployToEvent)
                ;
    }

    @SuppressWarnings("unchecked")
    Stream<Status> getUserStories() {
        return withClient(c -> c.target("https://jira.adeo.no/rest/api/2/search")
                        .queryParam("jql", FO_JQL)
                        .queryParam("maxResults", 500)
                        // TODO
//                .queryParam("maxResults", 5)
                        .request()
                        .get(JiraIssues.class)
        ).issues.stream().map(this::jiraIssueToStatus);
    }

    private Event veraDeployToEvent(VeraDeploy veraDeploy) {
        return Event.builder()
                .id(veraDeploy.id)
                .timestamp(veraDeploy.deployed_timestamp.toInstant().toEpochMilli())
                .application(veraDeploy.application)
                .environment(veraDeploy.environment)
                .version(veraDeploy.version)
                .build();
    }

    private Status jiraIssueToStatus(JiraIssue jiraIssue) {
        Map<String, Object> fields = jiraIssue.fields;
        fields.put("id", jiraIssue.id);
        fields.put("key", jiraIssue.key);
        fields.put("rank", fields.get("customfield_16010"));

        // description kan bli veldig lang!
        fields.remove("description");

        return Status.builder()
                .id(jiraIssue.id)
                .type(ActionType.USER_STORY)
                .data(fields)
                .build();
    }

    @SuppressWarnings("unchecked")
    public List<ApplicationConfig> getApps() {
        // TODO: Bytte ut med ordentlig caching som invalideres?
        if (relevantApplications == null) {
            relevantApplications = getAppsFromDSLConfig();
        }
        return relevantApplications;
    }

    public ApplicationConfig getAppByName(String name) {
        return getApps().stream()
                .filter(app -> app.name.equalsIgnoreCase(name))
                .findFirst()
                .get();
    }


    private List<ApplicationConfig> getAppsFromDSLConfig() {
        String json = withClient(c -> c.target("https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/forenklet_oppfolging/config.json").request().get(String.class));
        Map<String, Map<String, String>> map = fromJson(json, Map.class);
        return map.entrySet().stream()
                .map(e -> ApplicationConfig.builder()
                        .name(e.getKey())
                        .gitUrl(e.getValue().get("gitUrl"))
                        .build()
                )
                .filter(StatusProvider::isNotTextApplication)
                .collect(toList());
    }

    private static boolean isNotTextApplication(ApplicationConfig app) {
        return !(app.name.endsWith("tekster") || app.name.endsWith("-vilkar"));
    }
}

