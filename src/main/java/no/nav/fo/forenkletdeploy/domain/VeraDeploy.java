package no.nav.fo.forenkletdeploy.vera;

import java.time.ZonedDateTime;
import java.util.ArrayList;

public class VeraDeploy {
    public String id;
    public String application;
    public ZonedDateTime deployed_timestamp;
    public String version;
    public String environment;

    public static class VeraDeploys extends ArrayList<VeraDeploy> {
    }
}
