package no.nav.fo.forenkletdeploy;

import no.nav.dialogarena.config.fasit.FasitUtils;
import no.nav.dialogarena.config.fasit.TestUser;

import javax.servlet.ServletContext;

import static java.lang.System.setProperty;
import static no.nav.metrics.MetricsFactory.DISABLE_METRICS_REPORT_KEY;
import static no.nav.sbl.dialogarena.test.ssl.SSLTestUtils.disableCertificateChecks;

public class TestUtils {
    private static final String JIRA_USERNAME_PROPERTY_NAME = "jira.username";
    private static final String JIRA_PASSWORD_PROPERTY_NAME = "jira.password";

    public static void setupContext() {
        System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no");
        System.setProperty("http.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("http.proxyPort", "8088");
        System.setProperty("https.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("https.proxyPort", "8088");

        disableCertificateChecks();

        System.setProperty(DISABLE_METRICS_REPORT_KEY, Boolean.TRUE.toString());
        TestUser bekkciJiraDeploy = FasitUtils.getTestUser("bekkci_jira_deploy");
        setProperty(JIRA_USERNAME_PROPERTY_NAME, bekkciJiraDeploy.username);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
    }
}
