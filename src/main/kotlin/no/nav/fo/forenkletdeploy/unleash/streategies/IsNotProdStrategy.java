package no.nav.fo.forenkletdeploy.unleash.streategies;

import no.finn.unleash.strategy.Strategy;
import no.nav.fo.forenkletdeploy.service.UnleashService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class IsNotProdStrategy implements Strategy {
    static final List<String> prodEnvs = Arrays.asList("p", "q0", "t0");

    @Override
    public String getName() {
        return "isNotProd";
    }

    @Override
    public boolean isEnabled(Map<String, String> parameters) {
        String env = UnleashService.getEnvironment();
        return !prodEnvs.contains(env);
    }
}
