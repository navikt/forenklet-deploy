package no.nav.fo.forenkletdeploy.unleash.streategies;

import no.finn.unleash.strategy.Strategy;
import no.nav.fo.forenkletdeploy.service.UnleashService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ByEnvironmentStrategy implements Strategy {
    @Override
    public String getName() {
        return "byEnvironment";
    }

    @Override
    public boolean isEnabled(Map<String, String> parameters) {
        String env = UnleashService.getEnvironment();
        List<String> enabledEnvs =  Arrays.asList(parameters.getOrDefault("miljø", "").split(","));
        return enabledEnvs.contains(env);
    }
}
