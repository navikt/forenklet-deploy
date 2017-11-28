package no.nav.fo.forenkletdeploy.domain;

import no.nav.fo.forenkletdeploy.database.Database;
import no.nav.fo.forenkletdeploy.database.Event;
import no.nav.sbl.rest.RestUtils;
import no.nav.sbl.util.EnumUtils;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.function.BiConsumer;

@Component
public class Dispatch {

    private Map<ActionType, BiConsumer<Action, ActionContext>> actionMap = new HashMap<>();

    private final Database database;

    @Inject
    public Dispatch(Database database) {
        this.database = database;
        this.actionMap.put(ActionType.REQUEST_EVENTS, this::requestEvents);
    }

    private void requestEvents(@SuppressWarnings("unused") Action action, ActionContext actionContext) {
        Set<String> relevantApplications = new HashSet<>();
        Set<String> relevantEnvironment = new HashSet<>();

        this.database.lesEventer(e -> {
            relevantApplications.add(e.getApplication());
            relevantEnvironment.add(e.getEnvironment());
            actionContext.dispatch(Action.event(e));
        });

        getVeraDeploys()
                .stream()
                .map(this::veraDeployToEvent)
                .filter(e -> relevantApplications.contains(e.getApplication()) && relevantEnvironment.contains(e.getEnvironment()))
                .map(Action::event)
                .forEach(actionContext::dispatch);

        actionContext.dispatch(Action.eventsProvided());
    }

    private List<Map<String, String>> getVeraDeploys() {
        return RestUtils.withClient(c -> (List<Map<String, String>>) c.target("https://vera.adeo.no/api/v1/deploylog?onlyLatest=true&filterUndeployed=true")
                .request()
                .get(List.class));
    }

    private Event veraDeployToEvent(Map<String, String> v) {
        ZonedDateTime timestamp = ZonedDateTime.parse(v.get("deployed_timestamp"));
        return Event.builder()
                .id(v.get("id"))
                .timestamp(timestamp.toInstant().toEpochMilli())
                .application(v.get("application"))
                .environment(v.get("environment"))
                .version(v.get("version"))
                .build();
    }

    public void dispatch(Action action, ActionContext actionContext) {
        EnumUtils.valueOf(ActionType.class, action.type)
                .map(actionType -> actionMap.get(actionType))
                .ifPresent(c -> c.accept(action, actionContext));
    }

}
