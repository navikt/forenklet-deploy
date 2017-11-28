package no.nav.fo.forenkletdeploy;

import no.nav.apiapp.ApiApplication;
import no.nav.apiapp.ServletUtil;
import no.nav.fo.forenkletdeploy.domain.Dispatch;
import no.nav.fo.forenkletdeploy.websocket.Servlet;
import no.nav.fo.forenkletdeploy.websocket.WebsocketContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.servlet.ServletContext;

import static no.nav.apiapp.ApiApplication.Sone.FSS;
import static no.nav.apiapp.ServletUtil.leggTilServlet;

@Configuration
@ComponentScan(basePackages = "no.nav.fo.forenkletdeploy")
public class ApplicationConfig implements ApiApplication {

    @Override
    public String getApplicationName() {
        return "forenklet-deploy";
    }

    @Override
    public Sone getSone() {
        return FSS;
    }

    @Override
    public void startup(ServletContext servletContext) {
        WebsocketContext websocketContext = ServletUtil.getContext(servletContext).getBean(WebsocketContext.class);
        Dispatch dispatch = ServletUtil.getContext(servletContext).getBean(Dispatch.class);
        Servlet servlet = new Servlet(dispatch, websocketContext);
        leggTilServlet(servletContext, servlet, "/ws/*");
    }

    @Override
    public boolean brukSTSHelsesjekk() {
        return false;
    }

    @Override
    public boolean brukContextPath() {
        return false;
    }

}
