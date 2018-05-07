package no.nav.fo.forenkletdeploy.util;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.fasterxml.jackson.module.kotlin.KotlinModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import java.util.List;

import static com.fasterxml.jackson.databind.DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT;
import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Produces({"*/*", APPLICATION_JSON})
@Consumes({"*/*", APPLICATION_JSON})
public class JsonProvider extends JacksonJaxbJsonProvider {

    public JsonProvider() {
        setMapper(createObjectMapper());
    }

    public JsonProvider(List<Module> modules) {
        ObjectMapper objectMapper = createObjectMapper();
        modules.forEach(objectMapper::registerModule);
        setMapper(objectMapper);
    }

    public static ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .registerModule(new Jdk8Module())
                .registerModule(new KotlinModule())
                .registerModule(new JavaTimeModule())
                .registerModule(new ParameterNamesModule())
                .configure(FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true)
                ;

        return objectMapper;
    }

}