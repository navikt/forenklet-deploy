package no.nav.fo.forenkletdeploy.domain;

import no.nav.fo.forenkletdeploy.jira.*;
import no.nav.fo.forenkletdeploy.stash.StashCommits;
import no.nav.fo.forenkletdeploy.vera.VeraDeploy;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static no.nav.fo.forenkletdeploy.domain.ActionType.COMMIT;
import static no.nav.sbl.rest.RestUtils.withClient;
import static no.nav.sbl.util.EnvironmentUtils.getRequiredProperty;
import static org.glassfish.jersey.client.authentication.HttpAuthenticationFeature.basic;

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

//    public Stream<Status> getDevStatus(Status status) {
//        return withClient(c -> {
//            c.register(basic(getRequiredProperty(JIRA_USERNAME_PROPERTY_NAME), getRequiredProperty(JIRA_PASSWORD_PROPERTY_NAME)));
//            return c.target(String.format("https://jira.adeo.no/rest/dev-status/latest/issue/detail?issueId=%s&applicationType=stash&dataType=repository", status.id))
//                    .request()
//                    .get(DevStatusDetails.class);
//        }).detail.stream().flatMap(this::detailToStatuses);
//    }

//    private Stream<Status> detailToStatuses(DevStatusDetail devStatusDetail) {
//        return devStatusDetail.repositories
//                .stream()
//                .flatMap(r -> r.commits.stream().map(commit -> jiraCommitToStatus(commit, r)));
//    }

//    private Status jiraCommitToStatus(Map<String, Object> commitData, DevStatusRepository devStatusRepository) {
//        commitData.put("application", devStatusRepository.name);
//        return Status.builder()
//                .id((String) commitData.get("id"))
//                .type(COMMIT)
//                .data(commitData)
//                .build();
//    }

    public Stream<Status> getCommits(String application) {
        // TODO GITHUB!
        if("veilarbjobbsokerkompetanse".equals(application)){
            return Stream.empty();
        }

        String url = String.format("http://stash.devillo.no/rest/api/1.0/projects/fo/repos/%s/commits", application);
        try {
            Stream<Status> limit = withClient(c -> c.target(url)
                    .queryParam("limit", LIMIT)
                    .request()
                    .get(StashCommits.class)
            ).values.stream().map(devStatusDetail -> commitToStatus(devStatusDetail, application));
            return limit;
        } catch (Throwable t) {
            throw t;
        }
    }

    private Status commitToStatus(Map<String, Object> commitData, String application) {
        commitData.put("application", application);

        // TODO testing!
        Object message = commitData.get("message");
        commitData.put("message", String.format("FO-%s %s", Math.abs(message.hashCode() % 100), message));

        return Status.builder()
                .id((String) commitData.get("id"))
                .type(COMMIT)
                .data(commitData)
                .build();
    }

    public Stream<Status> getTags(String application) {
        // TODO GITHUB!
        if("veilarbjobbsokerkompetanse".equals(application)){
            return Stream.empty();
        }



        return withClient(c -> c.target(String.format("http://stash.devillo.no/rest/api/1.0/projects/fo/repos/%s/tags", application))
                .queryParam("limit", LIMIT)
                .request()
                .get(StashCommits.class)
        ).values.stream().map(devStatusDetail -> tagToStatus(devStatusDetail, application));
    }

    private Status tagToStatus(Map<String, Object> devStatusDetail, String application) {
        devStatusDetail.put("application", application);
        return Status.builder()
                .id((String) devStatusDetail.get("id"))
                .type(ActionType.TAG)
                .data(devStatusDetail)
                .build()
                ;
    }


}
