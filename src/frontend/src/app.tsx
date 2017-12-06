import * as React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import getStore from './store';
import routerHistory from './router-history';
import Routing from './routing';
import Loader from './view/loader';
import Header from './view/header';
import {setupMockWS} from './mock/mock-ws';

const store = getStore();

if (process.env.REACT_APP_MOCK === 'true') {
    setupMockWS();
}

function App() {
    return (
        <Provider store={store}>
            <Router history={routerHistory}>
                <Loader>
                    <Header/>
                    <div className="content__wrapper">
                        <Routing/>
                    </div>
                </Loader>
            </Router>
        </Provider>
    );
}

export default App;
