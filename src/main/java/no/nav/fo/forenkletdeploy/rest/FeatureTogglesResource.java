package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.domain.FeatureToggle;
import no.nav.fo.forenkletdeploy.service.UnleashService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/featuretoggles")
@Component
public class FeatureTogglesResource {
    private UnleashService unleashService;

    @Inject
    public FeatureTogglesResource(UnleashService unleashService) {
        this.unleashService = unleashService;
    }

    @GET
    @Path("/{togglename}")
    public FeatureToggle getToggleByName(@PathParam("togglename") String togglename) {
        return FeatureToggle.builder()
                .name(togglename)
                .enabled(unleashService.isEnabled(togglename))
                .build();
    }
}
