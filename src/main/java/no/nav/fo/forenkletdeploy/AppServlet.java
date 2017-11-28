package no.nav.fo.forenkletdeploy;

import no.nav.metrics.MetricsFactory;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AppServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = getServletContext().getNamedDispatcher("default");

        String fileRequestPattern = "^(.+\\..{1,4})$";

        if (!request.getRequestURI().matches(fileRequestPattern)) {
            RequestDispatcher index = getServletContext().getRequestDispatcher("/index.html");
            index.forward(request, response);
            MetricsFactory.createEvent("pageload").report();
        } else {
            dispatcher.forward(request, response);
        }
    }

}
