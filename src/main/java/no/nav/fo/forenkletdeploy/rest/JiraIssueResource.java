package no.nav.fo.forenkletdeploy.rest;

import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("jira")
@Component
public class JiraIssueResource {

    @GET
    @Path("/")
    public String hello() {
        return "Hello, world!";
    }
}
