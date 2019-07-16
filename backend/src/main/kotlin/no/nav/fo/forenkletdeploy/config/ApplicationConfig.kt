package no.nav.fo.forenkletdeploy.config

import no.nav.fo.forenkletdeploy.util.CorsFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.jcache.JCacheCacheManager
import javax.cache.Caching


@Configuration
@EnableCaching
open class ApplicationConfig {
    @Bean
    open fun corsFilterRegistration(): FilterRegistrationBean<CorsFilter> {
        val frb: FilterRegistrationBean<CorsFilter> = FilterRegistrationBean()
        frb.filter = CorsFilter()
        frb.urlPatterns = arrayListOf("/*")
        return frb
    }

    @Bean
    open fun cacheManager(): CacheManager {
        val cachingProvider = Caching.getCachingProvider()
        val cacheManager = cachingProvider.getCacheManager(
                javaClass.getResource("/cache.xml").toURI(),
                cachingProvider.defaultClassLoader
        )
        return JCacheCacheManager(cacheManager)
    }
}
