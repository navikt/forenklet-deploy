import no.nav.apiapp.ApiApp;
import no.nav.fo.forenkletdeploy.ApplicationConfig;
import no.nav.sbl.util.PropertyUtils;

import static java.lang.Boolean.TRUE;
import static no.nav.apiapp.feil.FeilMapper.VIS_DETALJER_VED_FEIL;
import static no.nav.sbl.dialogarena.test.ssl.SSLTestUtils.disableCertificateChecks;
import static no.nav.sbl.util.EnvironmentUtils.Type.PUBLIC;

public class Main {

    public static void main(String... args) throws Exception {
        System.setProperty("http.nonProxyHosts", "*.155.55.|*.192.168.|*.10.|*.local|*.rtv.gov|*.adeo.no|*.nav.no|*.aetat.no|*.devillo.no|*.oera.no");
        System.setProperty("http.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("http.proxyPort", "8088");
        System.setProperty("https.proxyHost", "webproxy-utvikler.nav.no");
        System.setProperty("https.proxyPort", "8088");
        disableCertificateChecks();

        PropertyUtils.setProperty(VIS_DETALJER_VED_FEIL, TRUE.toString(), PUBLIC);

        ApiApp.startApp(ApplicationConfig.class, args);
    }

}
