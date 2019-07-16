package no.nav.fo.forenkletdeploy.config

import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver

import java.io.IOException

@Configuration
open class WebMvcConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**/*")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(object : PathResourceResolver() {
                    @Throws(IOException::class)
                    override fun getResource(resourcePath: String,
                                             location: Resource): Resource {
                        val requestedResource = location.createRelative(resourcePath)
                        return if (requestedResource.exists() && requestedResource.isReadable)
                            requestedResource
                        else
                            ClassPathResource("/static/index.html")
                    }
                })
    }
}
