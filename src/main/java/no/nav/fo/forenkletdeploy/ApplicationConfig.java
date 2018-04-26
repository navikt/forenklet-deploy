package no.nav.fo.forenkletdeploy;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.servlet.DispatcherType;
import javax.servlet.ServletContext;
import java.util.Arrays;
import java.util.EnumSet;

@Configuration
@EnableScheduling
public class ApplicationConfig {
    @Bean
    FilterRegistrationBean corsFilterRegistration() {
        FilterRegistrationBean frb = new FilterRegistrationBean();
        frb.setFilter(new CorsFilter());
        frb.setUrlPatterns(Arrays.asList("/*"));
        return frb;
    }
}
