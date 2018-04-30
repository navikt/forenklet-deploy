package no.nav.fo.forenkletdeploy;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import static java.util.stream.Collectors.joining;

public class CorsFilter implements Filter {

    public static final String ORIGIN = "Origin";
    public static final String ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";

    public static final String ALLOWED_METHODS = Arrays.asList(
            "GET",
            "HEAD",
            "POST",
            "PATCH",
            "PUT",
            "DELETE",
            "OPTIONS"
    ).stream().collect(joining(", "));

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String originHeader = httpServletRequest.getHeader(ORIGIN);

        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, originHeader);
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
