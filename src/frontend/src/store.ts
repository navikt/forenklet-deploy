import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux/reducer';
import { AppState } from './redux/reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function create(): Store<AppState> {
    const composed = composeEnhancers(
        applyMiddleware(thunkMiddleware)
    );

    return createStore(reducer, composed);
}

let store: Store<AppState>;
export default function getStore(): Store<AppState> {
    if (!store) {
        store = create();
    }
    return store;
}
