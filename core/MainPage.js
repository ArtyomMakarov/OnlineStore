import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from '../redux/reducers.js';
import ShopRoot from '../components/ShopRoot';

let store=createStore(combinedReducer);

class MainPage extends React.PureComponent {

    render() {

        return (
            <Provider store={store}>
                <ShopRoot/>
            </Provider>
        );

    }

}

export default MainPage;