package no.nav.fo.forenkletdeploy.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
public class InternalResource {
    @GetMapping("/isAlive")
    public String isAliveCheck() {
        return "Application: UP";
    }
}
