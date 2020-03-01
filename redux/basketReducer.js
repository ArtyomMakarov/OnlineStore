import {BUTTON_ADD_ITEM} from './basketAC';

const initState = {
  basket: [],
};

function basketReducer(state=initState, action) {
    switch (action.type){
        case BUTTON_ADD_ITEM: {
            let newState = {...state,
            basket: [...state.basket, action.item]};
            return newState;
        }

        default:
            return state;
    }
}

export default basketReducer;