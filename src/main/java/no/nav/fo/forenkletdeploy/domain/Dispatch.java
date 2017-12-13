package no.nav.fo.forenkletdeploy.domain;

import no.nav.fo.forenkletdeploy.commits.CommitProvider;
import no.nav.fo.forenkletdeploy.database.Database;
import no.nav.sbl.util.EnumUtils;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.stream.Collectors;

import static org.slf4j.LoggerFactory.getLogger;

@Component
public class Dispatch {

    private static final Logger LOG = getLogger(Dispatch.class);

    private Map<ActionType, BiConsumer<Action, ActionContext>> actionMap = new HashMap<>();

    private final Database database;
    private final StatusProvider statusProvider;

    @Inject
    public Dispatch(Database database, StatusProvider statusProvider) {
        this.database = database;
        this.statusProvider = statusProvider;
        this.actionMap.put(ActionType.REQUEST_EVENTS, this::requestEvents);
        this.actionMap.put(ActionType.REQUEST_STATUS, this::requestStatus);
        this.actionMap.put(ActionType.REQUEST_COMMITS, this::requestCommits);
    }

    private void requestEvents(@SuppressWarnings("unused") Action action, ActionContext actionContext) {
        this.database.lesEventer(e -> actionContext.dispatch(Action.event(e)));
        actionContext.dispatch(Action.eventsProvided());
    }

    private void requestCommits(@SuppressWarnings("unused") Action action, ActionContext actionContext) {
        CommitActionData data = CommitActionData.fromActionData((LinkedHashMap<String, String>) action.data);

        CommitProvider.getProviderForRepo(data.application)
                .getCommitsForRelease(data.application, data.fromTag, data.toTag)
                .forEach(commit -> actionContext.dispatch(Action.commit(commit)));

        actionContext.dispatch(Action.commitsProvided());
    }

    private void requestStatus(@SuppressWarnings("unused") Action action, ActionContext actionContext) {
        List<ApplicationConfig> relevantApplications = statusProvider.getApps();
        List<String> relevantApplicationNames = relevantApplications.stream()
                .map(r -> r.name)
                .collect(Collectors.toList());

        relevantApplications.forEach((v) -> {
            Status build = Status.builder()
                    .id(v.name)
                    .type(ActionType.APP)
                    .data(v)
                    .build();
            actionContext.dispatch(Action.status(build));
        });

        List<Event> veraDeploys = statusProvider.getVeraDeploys()
                .filter(e -> relevantApplicationNames.contains(e.getApplication()))
                .collect(Collectors.toList());

        veraDeploys.stream().map(Action::event).forEach(actionContext::dispatch);

        actionContext.dispatch(Action.statusProvided());
    }

    public void dispatch(Action action, ActionContext actionContext) {
        LOG.info("{}", action);
        EnumUtils.valueOf(ActionType.class, action.type)
                .map(actionType -> actionMap.get(actionType))
                .ifPresent(c -> {
                    try {
                        c.accept(action, actionContext);
                    } catch (Throwable t) {
                        LOG.error(t.getMessage(), t);
                        actionContext.dispatch(Action.error(t));
                    }
                });
    }

}
