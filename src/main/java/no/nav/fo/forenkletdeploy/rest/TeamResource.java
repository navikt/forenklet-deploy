package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.domain.Team;
import no.nav.fo.forenkletdeploy.service.TeamService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.List;

@Path("/teams")
@Component
public class TeamResource {

    private final TeamService teamService;

    @Inject
    public TeamResource(TeamService teamService) {
        this.teamService = teamService;
    }

    @GET
    public List<Team> getCommitsForApplication() {
        return teamService.getTeams();
    }

}
