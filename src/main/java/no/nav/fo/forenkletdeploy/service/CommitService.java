package no.nav.fo.forenkletdeploy.service;

import no.nav.fo.forenkletdeploy.commits.GithubCommitProvider;
import no.nav.fo.forenkletdeploy.commits.StashCommitProvider;
import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;
import no.nav.fo.forenkletdeploy.domain.Commit;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

@Component
public class CommitService {
    private final GithubCommitProvider githubCommitProvider;
    private final StashCommitProvider stashCommitProvider;

    @Inject
    public CommitService(GithubCommitProvider githubCommitProvider, StashCommitProvider stashCommitProvider) {
        this.githubCommitProvider = githubCommitProvider;
        this.stashCommitProvider = stashCommitProvider;
    }

    @Cacheable(value = "commits", keyGenerator = "cacheKeygenerator")
    public List<Commit> getCommitsForRelease(ApplicationConfig application, String fromVersion, String toVersion) {
        if (isGithubCommit(application.getGitUrl())) {
            return githubCommitProvider.getCommitsForRelease(application, fromVersion, toVersion);
        }
        return stashCommitProvider.getCommitsForRelease(application, fromVersion, toVersion);
    }

    private boolean isGithubCommit(String repoUri) {
        return repoUri.contains("github.com");
    }
}
