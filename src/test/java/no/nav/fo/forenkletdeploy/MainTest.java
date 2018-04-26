package no.nav.fo.forenkletdeploy;

import org.springframework.boot.SpringApplication;

import no.nav.fo.forenkletdeploy.Main;

public class MainTest {
    public static void main(String... args) {
        System.setProperty("webpeoxy.enabled", "false");
        System.setProperty("UNLEASH_API_URL", "https://unleash.herokuapp.com/api/");
        Main.main(args);
    }
}
