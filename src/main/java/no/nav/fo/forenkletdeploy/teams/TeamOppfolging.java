package no.nav.fo.forenkletdeploy.teams;

import no.nav.fo.forenkletdeploy.domain.ApplicationConfig;

import java.util.Arrays;
import java.util.List;

public class TeamOppfolging implements Team {

    @Override
    public String getId() {
        return "teamoppfolging";
    }

    @Override
    public String getDisplayName() {
        return "Team Oppfølging";
    }

    @Override
    public List<ApplicationConfig> getApplicationConfigs() {
        return Arrays.asList(
                ApplicationConfig.builder()
                        .name("modiabrukerdialog")
                        .gitUrl("ssh://git@stash.devillo.no:7999/dial/modiabrukerdialog.git")
                        .build(),
                ApplicationConfig.builder()
                        .name("internarbeidsflatedecorator")
                        .gitUrl("ssh://git@stash.devillo.no:7999/felles/internarbeidsflatedecorator.git")
                        .build());
    }
}
