package no.nav.fo.forenkletdeploy.domain;

import lombok.Data;
import lombok.experimental.Accessors;
import no.nav.fo.forenkletdeploy.database.Event;

import static no.nav.fo.forenkletdeploy.domain.ActionType.EVENT;
import static no.nav.fo.forenkletdeploy.domain.ActionType.EVENTS_PROVIDED;
import static no.nav.fo.forenkletdeploy.domain.ActionType.VERSION;

@Data
@Accessors(chain = true)
public class Action {

    public String type;
    public Object data;

    public Action setType(ActionType actionType){
        this.type = actionType.name();
        return this;
    }


    public static Action event(Event event){
        return new Action()
                .setType(EVENT)
                .setData(event);
    }

    public static Action version(Version version) {
        return new Action()
                .setType(VERSION)
                .setData(version)
                ;
    }

    public static Action eventsProvided() {
        return new Action().setType(EVENTS_PROVIDED);
    }
}
