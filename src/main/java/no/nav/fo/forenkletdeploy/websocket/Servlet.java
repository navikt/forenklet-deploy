package no.nav.fo.forenkletdeploy.websocket;


import no.nav.fo.forenkletdeploy.domain.Dispatch;
import org.eclipse.jetty.websocket.api.WebSocketPolicy;
import org.eclipse.jetty.websocket.servlet.*;

public class Servlet extends WebSocketServlet {

    private final Dispatch dispatch;
    private final WebsocketContext websocketContext;

    public Servlet(Dispatch dispatch, WebsocketContext websocketContext) {
        this.dispatch = dispatch;
        this.websocketContext = websocketContext;
    }

    @Override
    public void configure(WebSocketServletFactory webSocketServletFactory) {
        WebSocketPolicy webSocketPolicy = webSocketServletFactory.getPolicy();
        webSocketPolicy.setIdleTimeout(60 * 1000L);
        webSocketPolicy.setAsyncWriteTimeout(10 * 1000L);
        webSocketServletFactory.setCreator(new ASDF());
    }

    private class ASDF implements WebSocketCreator {
        @Override
        public Object createWebSocket(ServletUpgradeRequest servletUpgradeRequest, ServletUpgradeResponse servletUpgradeResponse) {
            return new Socket(dispatch, websocketContext);
        }
    }

}
