package no.nav.fo.forenkletdeploy.domain;

public enum ActionType {
    ERROR,

    REQUEST_EVENTS,
    EVENT,
    EVENTS_PROVIDED,

    REQUEST_COMMITS,
    COMMIT,
    COMMITS_PROVIDED,

    REQUEST_STATUS,
    APP,
    VERSION,
    USER_STORY,
    STATUS_PROVIDED
}
