package no.nav.fo.forenkletdeploy.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule
import javax.ws.rs.Consumes
import javax.ws.rs.Produces
import com.fasterxml.jackson.databind.DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT
import com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES
import com.fasterxml.jackson.databind.Module
import javax.ws.rs.core.MediaType.APPLICATION_JSON

@Produces("*/*", APPLICATION_JSON)
@Consumes("*/*", APPLICATION_JSON)
class JsonProvider(modules: List<Module> = emptyList()): JacksonJaxbJsonProvider() {
    init {
        val om = createObjectMapper()
        modules.forEach { om.registerModule(it) }
        setMapper(om)
    }
}

fun createObjectMapper(): ObjectMapper =
        ObjectMapper()
                .registerModule(Jdk8Module())
                .registerModule(KotlinModule())
                .registerModule(JavaTimeModule())
                .registerModule(ParameterNamesModule())
                .configure(FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true)