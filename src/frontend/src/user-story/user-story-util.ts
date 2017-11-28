import UserStory from "./user-story";
import Commit from "../dev/commit";

const statusNames = [
    'Test 2',
    'Test 1',
    'Fagfellevurdering',
    'Under arbeid'
];

function statusIndex(userStory: UserStory) {
    return statusNames.indexOf(userStory.status.name);
}

function nullsafeCompare(a: string, b: string) {
    return (a || "").localeCompare(b || "");
}

export function comparator(a: UserStory, b: UserStory) {
    const statusDiff = statusIndex(a) - statusIndex(b);
    if (statusDiff) {
        return statusDiff;
    }
    const rankDiff = nullsafeCompare(a.rank, b.rank);
    if (rankDiff) {
        return rankDiff;
    }
    return nullsafeCompare(a.created, b.created);
}

export function commitBelongToUserStory(commit: Commit, userStory: UserStory){
    return commit.message.startsWith(userStory.key);
}