package no.nav.fo.forenkletdeploy.database;

import no.nav.fo.forenkletdeploy.domain.Event;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@Component
public class Database {

    private List<Event> events = new ArrayList<>();

    public void save(Event event) {
        events.add(event);
    }

    public void lesEventer(Consumer<Event> consumer) {
        events.forEach(consumer::accept);
    }

}
