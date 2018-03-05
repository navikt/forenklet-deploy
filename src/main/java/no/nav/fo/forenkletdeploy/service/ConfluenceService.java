package no.nav.fo.forenkletdeploy.service;

import lombok.SneakyThrows;
import no.nav.fo.forenkletdeploy.domain.ReleaseNote;
import no.nav.fo.forenkletdeploy.util.MustacheUtil;
import no.nav.json.JsonUtils;
import no.nav.sbl.rest.RestUtils;
import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;
import org.springframework.stereotype.Component;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Supplier;

import static no.nav.sbl.util.EnvironmentUtils.getRequiredProperty;
import static org.glassfish.jersey.client.authentication.HttpAuthenticationFeature.basic;

@Component
public class ConfluenceService {

    public static final String CONTENT_API_URL = "https://confluence.adeo.no/rest/api/content";
    public static final String BEKKCI_CONFLUENCE_USERNAME_PROPERTY = "BEKKCI_CONFLUENCE_USERNAME";
    public static final String BEKKCI_CONFLUENCE_PASSWORD_PROPERTY = "BEKKCI_CONFLUENCE_PASSWORD";

    Supplier<Date> dateSupplier = Date::new;

    public ReleaseNote createReleaseNote(ReleaseNote releaseNote) {
        HttpAuthenticationFeature authenticationFeature = auth();

        return RestUtils.withClient(RestUtils.LONG_READ_CONFIG, c -> {
            c.register(authenticationFeature);
            CreatePageDTO createPageDTO = requestDTO(releaseNote);
            System.out.println(JsonUtils.toJson(createPageDTO));
            Response post = c.target(CONTENT_API_URL).request().post(Entity.json(createPageDTO));

            String responseString = post.readEntity(String.class);
            System.out.println(responseString);
            int status = post.getStatus();
            if (status != 200) {
                throw new IllegalStateException(responseString);
            } else {
                return releaseNote.withUrl(pageUrl(responseString));
            }
        });
    }

    @SneakyThrows
    private URL pageUrl(String responseString) {
        PageCreatedDTO pageCreatedDTO = JsonUtils.fromJson(responseString, PageCreatedDTO.class);
        return new URL(pageCreatedDTO._links.base + pageCreatedDTO._links.webui);
    }

    static HttpAuthenticationFeature auth() {
        return basic(
                getRequiredProperty(BEKKCI_CONFLUENCE_USERNAME_PROPERTY),
                getRequiredProperty(BEKKCI_CONFLUENCE_PASSWORD_PROPERTY)
        );
    }

    CreatePageDTO requestDTO(ReleaseNote releaseNote) {
        return new CreatePageDTO(releaseNote);
    }

    @SuppressWarnings("unused")
    private class CreatePageDTO {
        public final String type = "page";
        public final String title;
        public final AncestorsDTO ancestors = new AncestorsDTO();
        public final SpaceDTO space = new SpaceDTO();
        public final BodyDTO body;

        public CreatePageDTO(ReleaseNote releaseNote) {
            this.title = createTitle();
            this.body = new BodyDTO(releaseNote);
        }
    }

    private String createTitle() {
        return String.format("Release note %s",
                new SimpleDateFormat("dd.MM.yyyy").format(dateSupplier.get())
        );
    }

    private static class BodyDTO {
        public final StorageDTO storage;

        public BodyDTO(ReleaseNote releaseNote) {
            this.storage = new StorageDTO(releaseNote);
        }

    }

    @SuppressWarnings("unused")
    private static class StorageDTO {
        public final String value;
        public final String representation = "storage";

        public StorageDTO(ReleaseNote releaseNote) {
            this.value = MustacheUtil.renderMustacheTemplate("release-note-confluence.html.mustache", new TemplateData(releaseNote));
        }

    }

    private static class TemplateData {
        public final List<ReleaseNote.Application> applications;

        public TemplateData(ReleaseNote releaseNote) {
            this.applications = releaseNote.applications;
        }
    }

    private static class SpaceDTO {
        public final String key = "INI754";
    }

    private static class AncestorsDTO extends ArrayList<Map<String, Integer>> {
        public AncestorsDTO() {
            Map<String, Integer> map = new HashMap<>();
            map.put("id", 254466637);
            add(map);
        }
    }

    private static class PageCreatedDTO {
        private LinksDTO _links;
    }


    private static class LinksDTO {
        private String base;
        private String webui;
    }

}
