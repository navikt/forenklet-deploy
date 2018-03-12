package no.nav.fo.forenkletdeploy.teams;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static no.nav.json.JsonUtils.fromJson;
import static no.nav.sbl.rest.RestUtils.withClient;
import static no.nav.sbl.util.EnvironmentUtils.getRequiredProperty;

public class FOTeam implements Team {

    private static List<String> IGNORED_APPLICATIONS = Arrays.asList(
            "veilarbdemo",
            "badkitty"
    );

    @Override
    public String getId() {
        return "fo";
    }

    private String getConfigUrl() {
        String apiToken = getRequiredProperty("GITHUB_FO_CONFIG_TOKEN");
        String configUrl = "https://raw.githubusercontent.com/navikt/jenkins-dsl-scripts/master/forenklet_oppfolging/config.json?token={0}";
        return MessageFormat.format(configUrl, apiToken);
    }

    @Override
    public String getDisplayName() {
        return "Forenklet Oppfølging";
    }

    @Override
    public String getJenkinsFolder() {
        return "forenklet_oppfolging";
    }

    @Override
    public List<ApplicationConfig> getApplicationConfigs() {
        String json = withClient(c -> c.target(this.getConfigUrl()).request().get(String.class));
        Map<String, Map<String, String>> map = fromJson(json, Map.class);
        return map.entrySet().stream()
                .map(e -> ApplicationConfig.builder()
                        .name(e.getKey())
                        .gitUrl(e.getValue().get("gitUrl"))
                        .build()
                )
                .filter(FOTeam::applicationIsNotIgnored)
                .collect(toList());
    }

    private static boolean applicationIsNotIgnored(ApplicationConfig applicationConfig) {
        return !IGNORED_APPLICATIONS.contains(applicationConfig.name);
    }

}
