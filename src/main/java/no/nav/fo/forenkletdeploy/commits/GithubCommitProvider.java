package no.nav.fo.forenkletdeploy.commits;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.domain.Commit;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

@Component
public class GithubCommitProvider {
    private final StashCommitProvider stashCommitProvider;

    @Inject
    public GithubCommitProvider(StashCommitProvider stashCommitProvider) {
        this.stashCommitProvider = stashCommitProvider;
    }

    public List<Commit> getCommitsForRelease(ApplicationConfig application, String fromTag, String toTag) {
        ApplicationConfig applicationStash = ApplicationConfig.builder()
                .gitUrl(String.format("ssh://git@stash.devillo.no:7999/fa/%s.git", application.getName()))
                .name(application.name)
                .build();

        return stashCommitProvider.getCommitsForRelease(applicationStash, fromTag, toTag);
    }
}
