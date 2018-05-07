package no.nav.fo.forenkletdeploy.unleash.streategies

import no.finn.unleash.strategy.Strategy
import no.nav.fo.forenkletdeploy.util.Utils.getEnvironment

import java.util.Arrays

class IsNotProdStrategy : Strategy {
    val prodEnvs = arrayOf("p", "q0")

    override fun getName(): String {
        return "isNotProd"
    }

    override fun isEnabled(parameters: Map<String, String>): Boolean =
        !prodEnvs.contains(getEnvironment())

    companion object {
        internal val prodEnvs = Arrays.asList("p", "q0", "t0")
    }
}
