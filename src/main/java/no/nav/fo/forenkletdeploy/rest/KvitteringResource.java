package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.domain.JiraIssue;
import no.nav.fo.forenkletdeploy.domain.ReleaseNote;
import no.nav.fo.forenkletdeploy.service.ConfluenceService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("kvittering")
@Component
public class KvitteringResource {

    private final ConfluenceService confluenceService;

    @Inject
    public KvitteringResource(ConfluenceService confluenceService) {
        this.confluenceService = confluenceService;
    }

    @POST
    @Path("/")
    public ReleaseNote lagreKvittering(LagreKvitteringRequest lagreKvitteringRequest) {
        return confluenceService.createReleaseNote(ReleaseNote.builder()
                .applications(mapApplications(lagreKvitteringRequest))
                .build()
        );
    }

    private List<ReleaseNote.Application> mapApplications(LagreKvitteringRequest lagreKvitteringRequest) {
        return lagreKvitteringRequest.stream().map(issues -> new ReleaseNote.Application(
                issues.application,
                issues.toVersion,
                issues.issues.stream().map(i -> i.key).collect(toList()))
        ).collect(toList());
    }

    public static class LagreKvitteringRequest extends ArrayList<ReleaseWithCommitsAndIssues> {
    }

    public static class ReleaseWithCommitsAndIssues {
        public String application;
        public String toVersion;
        public List<JiraIssue> issues;
    }

}
