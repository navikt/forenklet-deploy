package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Status {

    public String id;
    public long timestamp = System.currentTimeMillis();
    public ActionType type;
    public Object data;

}
