const BUTTON_ADD_ITEM = "BUTTON_ADD_ITEM";

const itemButtonAdd = function (item) {
    return {
        type: BUTTON_ADD_ITEM,
        item: item,
    }
};

export {
    BUTTON_ADD_ITEM, itemButtonAdd
}