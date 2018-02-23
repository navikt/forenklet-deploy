package no.nav.fo.forenkletdeploy.service;

import no.finn.unleash.DefaultUnleash;
import no.finn.unleash.util.UnleashConfig;
import no.nav.fo.forenkletdeploy.unleash.streategies.ByEnvironmentStrategy;
import org.springframework.stereotype.Component;

@Component
public class UnleashService {
    private DefaultUnleash unleash;

    public UnleashService() {
        UnleashConfig config = UnleashConfig.builder()
                .appName("forenklet-deploy")
                .instanceId(System.getProperty("FASIT_ENVIRONMENT_NAME", "local"))
                .unleashAPI(System.getProperty("UNLEASH_API_URL"))
                .build();

        this.unleash = new DefaultUnleash(config, new ByEnvironmentStrategy());
    }

    public boolean isEnabled(String toggleName) {
        return this.unleash.isEnabled(toggleName);
    }
}
