import { combineReducers } from 'redux';

import basketReducer from "./basketReducer";

let combinedReducer=combineReducers({
    basket: basketReducer,
});

export default combinedReducer;
