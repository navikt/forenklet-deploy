package no.nav.fo.forenkletdeploy.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Version {
    public String application;
    public String environment;
    public String version;
}
