import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import rootReducer from './reducers'
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()