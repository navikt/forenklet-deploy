package no.nav.fo.forenkletdeploy.service

import no.finn.unleash.DefaultUnleash
import no.finn.unleash.util.UnleashConfig
import no.nav.fo.forenkletdeploy.unleash.streategies.ByEnvironmentStrategy
import no.nav.fo.forenkletdeploy.unleash.streategies.IsDevStrategy
import no.nav.fo.forenkletdeploy.unleash.streategies.IsNotProdStrategy
import no.nav.fo.forenkletdeploy.util.Utils.getEnvironment
import no.nav.fo.forenkletdeploy.util.Utils.getRequiredProperty
import org.springframework.stereotype.Service

@Service
class UnleashService {
    val unleash = DefaultUnleash(
            UnleashConfig.builder()
                    .appName("forenklet-deploy")
                    .instanceId(getEnvironment())
                    .unleashAPI(getRequiredProperty("UNLEASH_API_URL"))
                    .build()
    , ByEnvironmentStrategy(), IsDevStrategy(), IsNotProdStrategy())

    fun isEnabled(toggleName: String): Boolean =
            unleash.isEnabled(toggleName)
}