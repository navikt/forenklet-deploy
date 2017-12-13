package no.nav.fo.forenkletdeploy.commits;

import no.nav.fo.forenkletdeploy.domain.Commit;

import java.util.List;

public interface CommitProvider {
    List<Commit> getCommitsForRelease(String repo, String fromTag, String toTag);

    static CommitProvider getProviderForRepo(String repo) {
        return new MockCommitProvider();
    }
}
