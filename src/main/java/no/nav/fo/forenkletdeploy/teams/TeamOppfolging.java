package no.nav.fo.forenkletdeploy.teams;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static no.nav.json.JsonUtils.fromJson;
import static no.nav.sbl.rest.RestUtils.withClient;

public class TeamOppfolging implements Team {

    public static final String APPLICATION_CONFIG_URL = "http://stash.devillo.no/projects/OPP/repos/team-oppfolging/raw/applikasjonsportefolje/config.json";

    @Override
    public String getId() {
        return "teamoppfolging";
    }

    @Override
    public String getDisplayName() {
        return "Team Oppfølging";
    }

    @Override
    public String getJenkinsFolder() {
        return "teamoppfolging";
    }

    @Override
    public List<ApplicationConfig> getApplicationConfigs() {
        String json = withClient(c -> c.target(APPLICATION_CONFIG_URL).request().get(String.class));
        Map<String, Map<String, String>> map = fromJson(json, Map.class);
        return map.entrySet().stream()
                .map(entry -> ApplicationConfig.builder()
                        .name(entry.getKey())
                        .gitUrl(entry.getValue().get("gitUrl"))
                        .build()
                )
                .collect(toList());
    }
}
