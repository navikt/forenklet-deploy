package no.nav.fo.forenkletdeploy.util;

import javax.ws.rs.client.Invocation;
import java.util.Base64;

import static no.nav.sbl.rest.RestUtils.withClient;
import static no.nav.sbl.util.EnvironmentUtils.getRequiredProperty;

public class HttpUtil {

    private static String getGithubEncodedBasicAuthHeader() {
        String credentials = String.format("jenkinspus:%s", getRequiredProperty("GITHUB_JENKINSPUS_TOKEN"));
        return Base64.getEncoder().encodeToString(credentials.getBytes());
    }

    public static Invocation.Builder githubHttpRequest(String url) {
        return withClient(c -> c.target(url).request().header("Authorization", String.format("Basic %s", getGithubEncodedBasicAuthHeader())));
    }

}
