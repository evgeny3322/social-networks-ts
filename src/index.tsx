import React from 'react';
import './index.css';
import {store} from "./redux/redux-store";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import App from "./App";
import ReactDOM from 'react-dom';
import MainApp from "./App";

ReactDOM.render(
    // <HashRouter basename={process.env.PUBLIC_URL}>
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
    // <MainApp/>
    ,
    document.getElementById('root')
);

