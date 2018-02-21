package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Team {
    String displayName;
    String id;
    String jenkinsFolder;
}
