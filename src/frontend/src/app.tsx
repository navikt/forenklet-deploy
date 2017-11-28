import * as React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import getStore from './store';
import routerHistory from './router-history';
import Routing from './routing';
import Header from './view/header';

const store = getStore();

function App() {
    return (
        <Provider store={store}>
            <Router history={routerHistory}>
                <div>
                    <Header/>
                    <Routing/>
                </div>
            </Router>
        </Provider>
    );
}


export default App;
