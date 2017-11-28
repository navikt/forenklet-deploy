package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Event {

    public String id;
    public long timestamp;
    public String application;
    public String environment;
    public String eventType;
    public String version;

}
