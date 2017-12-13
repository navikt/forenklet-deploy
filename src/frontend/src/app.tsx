import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './store';
import Routing from './routing';
import Loader from './view/loader';
import Header from './view/header';
import { setupMockWS } from './mock/mock-ws';

if (process.env.REACT_APP_MOCK === 'true') {
    setupMockWS();
}

const store = getStore();

function App() {
    return (
        <Provider store={store}>
            <Loader>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <section className="content__wrapper">
                            <Routing />
                        </section>
                    </div>
                </BrowserRouter>
            </Loader>
        </Provider>
    );
}

export default App;
