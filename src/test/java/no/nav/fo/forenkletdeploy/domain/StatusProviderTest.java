package no.nav.fo.forenkletdeploy.domain;

import no.nav.fo.forenkletdeploy.TestUtils;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class StatusProviderTest {

    // TODO veilarbdemo
    public static final String APPLICATION = "veilarbdialog";
    public static final String ISSUE_ID = "522916";

    private StatusProvider statusProvider = new StatusProvider();

    @Before
    public void setup() {
        TestUtils.setupContext();
    }

    @Test
    public void getVeraDeploys() {
        assertThat(statusProvider.getVeraDeploys()).isNotEmpty();
    }

    @Test
    public void getUserStories() {
        assertThat(statusProvider.getUserStories()).isNotEmpty();
    }

//    @Test
//    public void getDevStatus() {
//        Status status = Status.builder().id(ISSUE_ID).build();
//        assertThat(statusProvider.getDevStatus(status)).isNotEmpty();
//    }

    @Test
    public void getDeploymentDiff() {
        assertThat(statusProvider.getCommits(APPLICATION)).isNotEmpty();
    }

    @Test
    public void getTags() {
        assertThat(statusProvider.getTags(APPLICATION)).isNotEmpty();
    }

}