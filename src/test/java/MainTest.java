import no.nav.fo.forenkletdeploy.TestUtils;

public class MainTest {

    public static final String TEST_PORT = "8800";

    public static void main(String[] args) throws Exception {
        TestUtils.setupContext();

        Main.main(TEST_PORT);
    }

}
