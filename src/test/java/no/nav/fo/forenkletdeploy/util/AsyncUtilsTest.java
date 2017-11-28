package no.nav.fo.forenkletdeploy.util;

import lombok.SneakyThrows;
import org.junit.Test;

import static java.util.Arrays.asList;
import static no.nav.fo.forenkletdeploy.util.AsyncUtils.asyncStream;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;


public class AsyncUtilsTest {

    public static final int TIMEOUT = 1000;

    @Test(timeout = TIMEOUT * 3)
    public void asyncStream_() {
        assertThat(asyncStream(asList(1, 2, 3, 4, 5), this::getAnInt))
                .hasSameElementsAs(asList(10, 20, 30, 40, 50));
    }

    @SneakyThrows
    private Integer getAnInt(Integer i) {
        Thread.sleep(TIMEOUT);
        return i * 10;
    }

}