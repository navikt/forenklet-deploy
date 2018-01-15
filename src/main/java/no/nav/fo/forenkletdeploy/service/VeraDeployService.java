package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.domain.VeraDeploy.VeraDeploys;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

import static no.nav.sbl.rest.RestUtils.withClient;

@Component
public class VeraDeployService {
    // https://jira.adeo.no/secure/RapidBoard.jspa?rapidView=11947
    private static final List<String> IKKE_INTERESSANTE_STATUSER = Arrays.asList(
            "Produktkø",
            "Analyse",
            "Verifisering",
            "Klar til utvikling",

            "Ferdig"
    );

    @Cacheable("veradeploys")
    public VeraDeploys getVeraDeploys() {
        return withClient(c -> c.target("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                .request()
                .get(VeraDeploys.class));
    }
}

