package no.nav.fo.forenkletdeploy.domain;

import lombok.Builder;
import lombok.Value;
import lombok.experimental.Wither;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Wither
@Builder
@Value
public class ReleaseNote {
    public URL url;
    public List<Application> applications;

    public static class Application {
        public final String name;
        public final String version;
        public final List<String> issueKeys;

        public Application(String name, String version, List<String> issueKeys) {
            this.name = name;
            this.version = version;
            this.issueKeys = issueKeys;
        }
    }
}
