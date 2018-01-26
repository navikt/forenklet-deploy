package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.provider.TeamProvider;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ApplicationService {

    private final TeamProvider teamProvider;

    @Inject
    public ApplicationService(TeamProvider teamProvider) {
        this.teamProvider = teamProvider;
    }

    @SuppressWarnings("unchecked")
    @Cacheable("applicationlist")
    public List<ApplicationConfig> getApps() {
        return getAllAppConfigurations();
    }

    private List<ApplicationConfig> getAllAppConfigurations() {
        return teamProvider.getTeams().stream()
                .flatMap(team -> team.getApplicationConfigs().stream())
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    @Cacheable("applicationlistbyteam")
    public List<ApplicationConfig> getAppsByTeam(String teamId) {
        return teamProvider.getTeams().stream()
                .filter(team -> team.getId().equals(teamId))
                .flatMap(team-> team.getApplicationConfigs().stream())
                .collect(Collectors.toList());
    }

    @Cacheable("appbyname")
    public ApplicationConfig getAppByName(String name) {
        return getAllAppConfigurations().stream()
                .filter(app -> app.name.equalsIgnoreCase(name))
                .findFirst()
                .get();
    }

}

