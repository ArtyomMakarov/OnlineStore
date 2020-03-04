"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combinedReducer from './redux/reducers.js';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from './pages/PagesRouter';
let store=createStore(combinedReducer);
// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <PagesRouter />
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('container') );
