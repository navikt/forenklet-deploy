package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.TestUtils;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class VeraDeployServiceTest {
    VeraDeployService veraDeployService = new VeraDeployService();

    @Before
    public void setup() {
        TestUtils.setupContext();
    }

    @Test
    public void getVeraDeploys() {
        assertThat(veraDeployService.getVeraDeploys()).isNotEmpty();
    }
}