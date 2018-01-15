package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.domain.Commit;
import no.nav.fo.forenkletdeploy.service.ApplicationService;
import no.nav.fo.forenkletdeploy.service.CommitService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

@Path("/commit")
@Component
public class CommitResource {
    private final ApplicationService applicationService;
    private final CommitService commitService;

    @Inject
    public CommitResource(ApplicationService applicationService, CommitService commitService) {
        this.applicationService = applicationService;
        this.commitService = commitService;
    }

    @GET
    @Path("/{application}")
    public List<Commit> getCommitsForApplication(
            @PathParam("application") String application,
            @QueryParam("fromVersion") String fromVersion,
            @QueryParam("toVersion") String toVersion
    ) {
        ApplicationConfig applicationConfig = applicationService.getAppByName(application);
        if (applicationConfig == null) {
            throw new NotFoundException("Kunne ikke finne ApplicationConfig for  " + application);
        }
        return commitService.getCommitsForRelease(applicationConfig, fromVersion, toVersion);
    }
}
