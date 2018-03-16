package no.nav.fo.forenkletdeploy.util;

import com.github.mustachejava.DefaultMustacheFactory;
import lombok.SneakyThrows;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;

import static java.util.Optional.ofNullable;

public class MustacheUtil {

    private static final DefaultMustacheFactory defaultMustacheFactory = new DefaultMustacheFactory();

    @SneakyThrows
    public static String renderMustacheTemplate(String name, Object data) {
        try (InputStream inputStream = open(name)) {
            try (InputStreamReader inputStreamReader = new InputStreamReader(inputStream)) {
                StringWriter stringWriter = new StringWriter();
                defaultMustacheFactory.compile(inputStreamReader, "app-policies").execute(stringWriter, data);
                return stringWriter.toString();
            }
        }
    }

    private static InputStream open(String name) {
        return ofNullable(MustacheUtil.class.getResourceAsStream("/" + name)).orElseThrow(()->new IllegalStateException(name));
    }

}
