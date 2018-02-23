package no.nav.fo.forenkletdeploy.service;

import no.finn.unleash.DefaultUnleash;
import no.finn.unleash.util.UnleashConfig;
import no.nav.fo.forenkletdeploy.unleash.streategies.ByEnvironmentStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class UnleashService {
    private DefaultUnleash unleash;
    private Logger LOG = LoggerFactory.getLogger(UnleashService.class.getName());

    public UnleashService() {
        String instanceId = System.getProperty("FASIT_ENVIRONMENT_NAME", "local");
        String env = System.getProperty("UNLEASH_API_URL");
        LOG.info(String.format("Setting up unleash with instance: '%s' with uri: '%s'", instanceId, env));

        UnleashConfig config = UnleashConfig.builder()
                .appName("forenklet-deploy")
                .instanceId(instanceId)
                .unleashAPI(env)
                .build();

        this.unleash = new DefaultUnleash(config, new ByEnvironmentStrategy());
    }

    public boolean isEnabled(String toggleName) {
        return this.unleash.isEnabled(toggleName);
    }
}
