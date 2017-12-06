import { Action, ActionType } from '../redux/actions';
import Commit from './commit';
import Tag from './tag';

export interface Commits {
    [id: string]: Commit;
}

export interface Tags {
    [id: string]: Tag;
}

export interface DevState {
    commits: Commits;
    tags: Tags;
}

const initialState = {
    commits: {},
    tags: {},
};
const tagIdPrefixLength = 'refs/tags/'.length;

export default function reducer(state: DevState = initialState,
                                action: Action): DevState {
    switch (action.type) {
        case ActionType.COMMIT:
            const commitStatus = action.data;
            const commit = commitStatus.data;
            return {
                ...state,
                commits: {
                    ...state.commits,
                    [commit.id]: commit
                }
            };
        case ActionType.TAG:
            const tagStatus = action.data;
            const tagData = tagStatus.data;
            const tagId = tagData.id.substring(tagIdPrefixLength);
            const tag = {
                ...tagData,
                id: tagId
            };
            return {
                ...state,
                tags: {
                    ...state.tags,
                    [tagId]: tag
                }
            };
        default:
            return state;
    }
}
