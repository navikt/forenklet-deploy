package no.nav.fo.forenkletdeploy;

import no.nav.apiapp.ApiApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.servlet.DispatcherType;
import javax.servlet.ServletContext;

import java.util.EnumSet;

import static no.nav.apiapp.ApiApplication.Sone.FSS;

@Configuration
@ComponentScan(basePackages = "no.nav.fo.forenkletdeploy")
public class ApplicationConfig implements ApiApplication {

    @Override
    public String getApplicationName() {
        return "forenklet-deploy";
    }

    @Override
    public Sone getSone() {
        return FSS;
    }

    @Override
    public void startup(ServletContext servletContext) {
        servletContext.addServlet("staticFileServlet", new AppServlet())
                .addMapping("/*");

        servletContext.addFilter("corsFilter", new CorsFilter())
                .addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), false, "/*");
    }

    @Override
    public boolean brukSTSHelsesjekk() {
        return false;
    }

    @Override
    public boolean brukContextPath() {
        return false;
    }

}
