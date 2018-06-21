package no.nav.fo.forenkletdeploy.unleash.streategies

import no.finn.unleash.strategy.Strategy
import no.nav.fo.forenkletdeploy.util.Utils.getEnvironment

import java.util.Arrays

class ByEnvironmentStrategy : Strategy {
    override fun getName(): String {
        return "byEnvironment"
    }

    override fun isEnabled(parameters: Map<String, String>?): Boolean {
        val enabledEnvs = parameters?.getOrDefault("miljø", "")?.split(",") ?: emptyList()
        return enabledEnvs.contains(getEnvironment())
    }
}
