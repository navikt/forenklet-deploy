package no.nav.fo.forenkletdeploy.service;

import lombok.SneakyThrows;
import no.nav.dialogarena.config.fasit.FasitUtils;
import no.nav.fo.forenkletdeploy.TestUtils;
import no.nav.fo.forenkletdeploy.domain.ReleaseNote;
import no.nav.sbl.dialogarena.test.SystemProperties;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static no.nav.json.JsonUtils.toJson;
import static no.nav.json.TestUtils.assertEqualJson;

public class ConfluenceServiceTest {

    private ConfluenceService confluenceService = new ConfluenceService();

    static {
        TestUtils.setupContext();
    }

    @Before
    public void setup() {
        confluenceService.dateSupplier = () -> new Date(3434454563L);
    }

    @Test
    @Ignore // TODO kan brukes i lokal utvikling.
    public void createReleaseNote() {
        confluenceService.createReleaseNote(releaseNote());
    }

    @Test
    public void requestDTO() {
        String json = toJson(confluenceService.requestDTO(releaseNote()));
        assertEqualJson(json, read("/confluence/requestDTO.json"));
    }

    private ReleaseNote releaseNote() {
        return ReleaseNote.builder().applications(Arrays.asList(
                new ReleaseNote.Application("a", "1.2.3", singletonList("FO-1")),
                new ReleaseNote.Application("b", "1.2.3", singletonList("FO-2")),
                new ReleaseNote.Application("c", "1.2.3", singletonList("FO-3"))
        )).build();
    }

    @SneakyThrows
    private String read(String name) {
        return IOUtils.toString(ConfluenceServiceTest.class.getResource(name), Charset.forName("UTF-8"));
    }

}