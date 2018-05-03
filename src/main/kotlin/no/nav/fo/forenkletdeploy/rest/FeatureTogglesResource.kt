package no.nav.fo.forenkletdeploy.rest

import no.nav.fo.forenkletdeploy.FeatureToggle
import no.nav.fo.forenkletdeploy.service.UnleashService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.inject.Inject

@RestController
@RequestMapping("/api/featuretoggles")
class FeatureTogglesResource @Inject
constructor(val unleashService: UnleashService) {

    @GetMapping("/{togglename}")
    fun getToggleByName(@PathVariable("togglename") togglename: String) =
            FeatureToggle(
                    name = togglename,
                    enabled = unleashService.isEnabled(togglename)
            )
}
