import {BUTTON_ADD_ITEM, BUTTON_DELETE_ITEM, BUTTON_DELETE_ALL} from './basketAC';

const initState = {
  basketItems: [],
};

function basketReducer(state=initState, action) {
    switch (action.type){
        case BUTTON_ADD_ITEM: {
            let newState = {...state,
            basketItems: [...state.basketItems, action.item]};
            return newState;
        }

        case BUTTON_DELETE_ITEM: {
            let newState = {...state, basketItems: [...state.basketItems]}
            var lastState = newState.basketItems.filter(item =>
                item.id !== action.id
            );
            newState.basketItems = lastState;
            return newState;
        }

        case BUTTON_DELETE_ALL: {
            let newState = {...state,
                basketItems: []};
            return newState;
        }

        default:
            return state;
    }
}

export default basketReducer;