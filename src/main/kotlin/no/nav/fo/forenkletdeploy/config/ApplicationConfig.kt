package no.nav.fo.forenkletdeploy.config

import no.nav.fo.forenkletdeploy.CorsFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.boot.web.servlet.FilterRegistrationBean


@Configuration
open class ApplicationConfig {
    @Bean
    open fun corsFilterRegistration(): FilterRegistrationBean<CorsFilter> {
        val frb: FilterRegistrationBean<CorsFilter> = FilterRegistrationBean()
        frb.filter = CorsFilter()
        frb.urlPatterns = arrayListOf("/*")
        return frb
    }
}
