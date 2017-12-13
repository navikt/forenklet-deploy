package no.nav.fo.forenkletdeploy;

import no.nav.dialogarena.config.fasit.FasitUtils;
import no.nav.dialogarena.config.fasit.TestUser;
import no.nav.metrics.MetricsFactory;

import static java.lang.System.setProperty;
import static no.nav.fo.forenkletdeploy.domain.StatusProvider.JIRA_PASSWORD_PROPERTY_NAME;
import static no.nav.fo.forenkletdeploy.domain.StatusProvider.JIRA_USERNAME_PROPERTY_NAME;
import static no.nav.metrics.MetricsFactory.DISABLE_METRICS_REPORT_KEY;

public class TestUtils {
    public static void setupContext() {
        System.setProperty(DISABLE_METRICS_REPORT_KEY, Boolean.TRUE.toString());
        TestUser bekkciJiraDeploy = FasitUtils.getTestUser("bekkci_jira_deploy");
        setProperty(JIRA_USERNAME_PROPERTY_NAME, bekkciJiraDeploy.username);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
        setProperty(JIRA_PASSWORD_PROPERTY_NAME, bekkciJiraDeploy.password);
    }
}
