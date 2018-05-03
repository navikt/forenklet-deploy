package no.nav.fo.forenkletdeploy.unleash.streategies

import no.finn.unleash.strategy.Strategy
import no.nav.fo.forenkletdeploy.service.UnleashService
import no.nav.fo.forenkletdeploy.util.Utils.getEnvironment

import java.util.Arrays

class IsDevStrategy : Strategy {
    override fun getName(): String {
        return "isDev"
    }

    override fun isEnabled(parameters: Map<String, String>): Boolean =
        getEnvironment().equals("local", ignoreCase = true)
}
