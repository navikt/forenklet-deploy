package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static no.nav.json.JsonUtils.fromJson;
import static no.nav.sbl.rest.RestUtils.withClient;

@Component
public class ApplicationService {
    private static List<String> IGNORED_APPLICATIONS = Arrays.asList(
            "modiacontextholder",
            "modiaeventdistribution",
            "internarbeidsflatedecorator",
            "veilarbdemo"
    );

    @SuppressWarnings("unchecked")
    @Cacheable("applicationlist")
    public List<ApplicationConfig> getApps() {
        return getAppsFromDSLConfig();
    }

    @Cacheable("appbyname")
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
                .filter(ApplicationService::applicationIsNotIgnored)
                .collect(toList());
    }

    private static boolean applicationIsNotIgnored(ApplicationConfig applicationConfig) {
        return !IGNORED_APPLICATIONS.contains(applicationConfig.name);
    }
}

