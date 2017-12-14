package no.nav.fo.forenkletdeploy.commits;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.domain.Commit;

import java.util.Arrays;
import java.util.List;

public class GithubCommitProvider implements CommitProvider {
    private StashCommitProvider stashCommitProvider = new StashCommitProvider();

    @Override
    public List<Commit> getCommitsForRelease(ApplicationConfig application, String fromTag, String toTag) {
        ApplicationConfig applicationStash = ApplicationConfig.builder()
                .gitUrl(String.format("ssh://git@stash.devillo.no:7999/fa/%s.git", application.getName()))
                .name(application.name)
                .build();

        return stashCommitProvider.getCommitsForRelease(applicationStash, fromTag, toTag);
    }
}
