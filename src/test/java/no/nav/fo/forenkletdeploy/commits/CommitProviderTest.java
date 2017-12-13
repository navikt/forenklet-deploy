package no.nav.fo.forenkletdeploy.commits;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class CommitProviderTest {

    @Test
    public void shouldReturnGithubCommitProviderForGithubUri() {
        List<String> validGitHubUri = Arrays.asList(
                "https://github.com/navikt/fo-forenket-deploy.git",
                "http://github.com/navikt/fo-forenket-deploy.git",
                "git@GITHUB.COM:navikt/veilarbportefoljeflatefs.git"
        );

        validGitHubUri.forEach(uri -> assertEquals(GithubCommitProvider.class, CommitProvider.getProviderForRepo(uri).getClass()));
    }

    @Test
    public void shouldReturnStashCommitProviderForStashUri() {
        List<String> validStashUri = Arrays.asList(
                "ssh://git@stash.devillo.no:7999/bekkci/jenkins-dsl-scripts.git",
                "http://stash.devillo.no/scm/bekkci/jenkins-dsl-scripts.git",
                "https://STASH.DEVILLO.NO/scm/bekkci/jenkins-dsl-scripts.git"
        );

        validStashUri.forEach(uri -> assertEquals(StashCommitProvider.class, CommitProvider.getProviderForRepo(uri).getClass()));
    }
}