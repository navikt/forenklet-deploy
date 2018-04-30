package no.nav.fo.forenkletdeploy;

import no.nav.fo.forenkletdeploy.config.ApplicationConfig;
import no.nav.fo.forenkletdeploy.util.SSLUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;


@Configuration
@Import({
        ApplicationConfig.class
})
@EnableAutoConfiguration
public class Main {
    public static void main(String... args) throws KeyManagementException, NoSuchAlgorithmException {
        System.setProperty("UNLEASH_API_URL", "https://unleash.nais.preprod.local/api/");
        if ("true".equalsIgnoreCase(System.getProperty("webproxy.enabled", "true"))) {
            SSLUtil.turnOffSslChecking();
            System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no");
            System.setProperty("http.proxyHost", "webproxy-utvikler.nav.no");
            System.setProperty("http.proxyPort", "8088");
            System.setProperty("https.proxyHost", "webproxy-utvikler.nav.no");
            System.setProperty("https.proxyPort", "8088");
        }

        SpringApplication.run(Main.class, args);
    }

}
