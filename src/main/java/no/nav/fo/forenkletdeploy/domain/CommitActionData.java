package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CommitActionData extends Action {
    String application;
    String fromTag;
    String toTag;

    public static CommitActionData fromActionData(Map<String, String> data) {
        return new CommitActionData(data.get("application"), data.get("fromTag"), data.get("toTag"));
    }
}
