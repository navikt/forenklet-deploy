package no.nav.fo.forenkletdeploy.unleash.streategies;

import no.finn.unleash.strategy.Strategy;

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
        String env = System.getProperty("FASIT_ENVIRONMENT_NAME", "local");
        List<String> enabledEnvs =  Arrays.asList(parameters.getOrDefault("miljø", "").split(","));
        return enabledEnvs.contains(env);
    }
}
