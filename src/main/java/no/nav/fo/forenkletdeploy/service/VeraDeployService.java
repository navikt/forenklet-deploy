package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.domain.VeraDeploy;
import no.nav.fo.forenkletdeploy.domain.VeraDeploy.VeraDeploys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static no.nav.fo.forenkletdeploy.util.Utils.withClient;

@Component
public class VeraDeployService {
    private static Logger LOG = LoggerFactory.getLogger(VeraDeployService.class.getName());
    @Cacheable("veradeploys")
    public List<VeraDeploy> getVeraDeploys() {
        try {
            return withClient("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                    .request()
                    .get(VeraDeploys.class);
        } catch(Exception e) {
            LOG.error("Kunne ikke hente deploys fra vera", e);
            return new ArrayList<>();
        }
    }
}

