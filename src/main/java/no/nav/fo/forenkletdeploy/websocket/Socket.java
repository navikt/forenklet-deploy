package no.nav.fo.forenkletdeploy.websocket;

import lombok.SneakyThrows;
import no.nav.fo.forenkletdeploy.domain.Action;
import no.nav.fo.forenkletdeploy.domain.ActionContext;
import no.nav.fo.forenkletdeploy.domain.Dispatch;
import no.nav.json.JsonUtils;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketListener;
import org.slf4j.Logger;

import static org.slf4j.LoggerFactory.getLogger;

public class Socket implements WebSocketListener, ActionContext {

    private static final Logger LOG = getLogger(Socket.class);

//    private static final Set<WSSocket> sockets = new HashSet<>();
//    private static final ObjectMapper objectMapper = JsonProvider.createObjectMapper();

    private final Dispatch dispatch;
    private final WebsocketContext websocketContext;

    //    private Query query;
    private Session session;

    public Socket(Dispatch dispatch, WebsocketContext websocketContext) {
        this.dispatch = dispatch;
        this.websocketContext = websocketContext;
    }

//    public static Set<Query> getQueries() {
//        return sockets.stream()
//                .map(s -> s.query)
//                .collect(Collectors.toSet());
//    }

    @Override
    public void onWebSocketBinary(byte[] bytes, int i, int i1) {
        LOG.info("onWebSocketBinary");
    }

    @Override
    public void onWebSocketClose(int i, String s) {
        LOG.info("onWebSocketClose: {} {}", i, s);
//        sockets.remove(this);
        this.websocketContext.remove(this);
    }

    @Override
    public void onWebSocketConnect(Session session) {
        LOG.info("onWebSocketConnect");
        this.session = session;
        this.websocketContext.add(this);
    }

    @Override
    public void onWebSocketError(Throwable throwable) {
        LOG.warn(throwable.getMessage(), throwable);
    }

    @Override
    public void onWebSocketText(String s) {
        LOG.info("onWebSocketText: {}", s);
        Action action = JsonUtils.fromJson(s, Action.class);
        dispatch.dispatch(action,this);
    }

    @Override
    @SneakyThrows
    public void dispatch(Action action) {
        LOG.info("respond: {}", action);
        this.session.getRemote().sendString(JsonUtils.toJson(action));
    }


}
