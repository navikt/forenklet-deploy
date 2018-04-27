package no.nav.fo.forenkletdeploy.config;

import no.nav.fo.forenkletdeploy.commits.GithubCommitProvider;
import no.nav.fo.forenkletdeploy.provider.TeamProvider;
import no.nav.fo.forenkletdeploy.service.CommitService;
import no.nav.fo.forenkletdeploy.service.TeamService;
import no.nav.fo.forenkletdeploy.service.UnleashService;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
        TeamProvider.class,
        GithubCommitProvider.class,
        UnleashService.class,
        CommitService.class,
        TeamService.class
})
@ComponentScan("no.nav.fo.forenkletdeploy.rest")
public class CommonConfig {
}
