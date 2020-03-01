import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';
import Page_Basket from '../pages/Page_Basket';

let store=createStore(combinedReducer);

class BasketRoot extends React.PureComponent {

    render() {

        return (
            <Provider store={store}>
                <Page_Basket/>
            </Provider>
        );

    }

}

export default BasketRoot;