package no.nav.fo.forenkletdeploy.commits;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.domain.Commit;

import java.util.List;

public interface CommitProvider {
    List<Commit> getCommitsForRelease(ApplicationConfig application, String fromTag, String toTag);

    static CommitProvider getProviderForApplication(ApplicationConfig application) {
        if (application.getGitUrl().toLowerCase().contains("stash.devillo.no")) {
            return new StashCommitProvider();
        }
        return new GithubCommitProvider();
    }
}
