package no.nav.fo.forenkletdeploy.websocket;

import no.nav.fo.forenkletdeploy.domain.Action;
import no.nav.fo.forenkletdeploy.domain.ActionContext;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class WebsocketContext implements ActionContext {

    private final Set<Socket> sockets = new HashSet<>();

    @Override
    public void dispatch(Action action) {
        sockets.forEach(s -> s.dispatch(action));
    }

    public void remove(Socket socket) {
        sockets.remove(socket);
    }

    public void add(Socket socket) {
        sockets.add(socket);
    }

}
