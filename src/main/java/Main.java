import no.nav.apiapp.ApiApp;
import no.nav.fo.forenkletdeploy.ApplicationConfig;

public class Main {

    public static void main(String... args) throws Exception {
        ApiApp.startApp(ApplicationConfig.class, args);
    }

}
