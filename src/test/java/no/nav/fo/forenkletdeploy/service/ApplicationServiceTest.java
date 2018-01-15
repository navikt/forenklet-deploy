package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.TestUtils;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationServiceTest {
    private ApplicationService applicationService = new ApplicationService();

    @Before
    public void setup() {
        TestUtils.setupContext();
    }

    @Test
    public void getApps() {
        assertThat(applicationService.getApps()).isNotEmpty();
    }
}