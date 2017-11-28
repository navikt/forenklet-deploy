package no.nav.fo.forenkletdeploy.rest;

import no.nav.fo.forenkletdeploy.database.Database;
import no.nav.fo.forenkletdeploy.database.Event;
import no.nav.fo.forenkletdeploy.domain.Action;
import no.nav.fo.forenkletdeploy.domain.Dispatch;
import no.nav.fo.forenkletdeploy.websocket.WebsocketContext;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.*;

import java.util.UUID;

import static java.lang.System.currentTimeMillis;

@Path("/")
@Component
public class EventResource {

    private final Database database;
    private final WebsocketContext websocketContext;

    @Inject
    public EventResource(Database database, WebsocketContext websocketContext) {
        this.database = database;
        this.websocketContext = websocketContext;
    }

    @Path("/{application}/{environment}/{eventType}")
    public EventResponse event(
            @PathParam("application") String application,
            @PathParam("environment") String environment,
            @PathParam("eventType") String eventType
    ) {
        Event event = Event.builder()
                .id(UUID.randomUUID().toString())
                .timestamp(currentTimeMillis())
                .application(application)
                .environment(environment)
                .eventType(eventType)
                .build();

        database.save(event);
        websocketContext.dispatch(Action.event(event));
        return new EventResponse(event);
    }

    public static class EventResponse {
        private final Event event;

        public EventResponse(Event event) {
            this.event = event;
        }

        @GET
        public Event get() {
            return event;
        }

        @POST
        public Event post() {
            return event;
        }

        @PUT
        public Event put() {
            return event;
        }

    }

}
