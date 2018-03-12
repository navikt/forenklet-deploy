package no.nav.fo.forenkletdeploy;

import no.nav.dialogarena.config.fasit.FasitUtils;
import no.nav.dialogarena.config.fasit.TestUser;
import no.nav.fo.forenkletdeploy.service.ConfluenceService;

import javax.servlet.ServletContext;

import static java.lang.System.setProperty;
import static no.nav.fo.forenkletdeploy.service.ConfluenceService.BEKKCI_CONFLUENCE_PASSWORD_PROPERTY;
import static no.nav.fo.forenkletdeploy.service.ConfluenceService.BEKKCI_CONFLUENCE_USERNAME_PROPERTY;
import static no.nav.metrics.MetricsFactory.DISABLE_METRICS_REPORT_KEY;
import static no.nav.sbl.dialogarena.test.ssl.SSLTestUtils.disableCertificateChecks;

public class TestUtils {

    public static void setupContext() {
        System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no");
        System.setProperty("http.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("http.proxyPort", "8088");
        System.setProperty("https.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("https.proxyPort", "8088");

        disableCertificateChecks();

        System.setProperty(DISABLE_METRICS_REPORT_KEY, Boolean.TRUE.toString());

        TestUser confluenceUser = FasitUtils.getTestUser("bekkci_confluence");
        setProperty(BEKKCI_CONFLUENCE_USERNAME_PROPERTY, confluenceUser.username);
        setProperty(BEKKCI_CONFLUENCE_PASSWORD_PROPERTY, confluenceUser.password);

        TestUser githubUser = FasitUtils.getTestUser("pus-github");
        setProperty("PUS_GITHUB_USERNAME", githubUser.username);
        setProperty("PUS_GITHUB_PASSWORD", githubUser.password);
    }
}
