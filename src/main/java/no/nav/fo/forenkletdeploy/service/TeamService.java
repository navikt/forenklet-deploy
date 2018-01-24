package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.domain.Team;
import no.nav.fo.forenkletdeploy.provider.TeamProvider;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TeamService {

    private final TeamProvider teamProvider;

    @Inject
    public TeamService(TeamProvider teamProvider) {
        this.teamProvider = teamProvider;
    }

    public List<Team> getTeams() {
        return teamProvider.getTeams().stream()
                .map(team -> Team.builder()
                        .id(team.getId())
                        .displayName(team.getDisplayName())
                        .build())
                .collect(Collectors.toList());
    }

}
