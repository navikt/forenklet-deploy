package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Commit {
    String hash;
    String application;
    String message;
    Long timestamp;
    String author;
    boolean mergecommit;
}
