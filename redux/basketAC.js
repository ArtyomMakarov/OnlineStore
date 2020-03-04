const BUTTON_ADD_ITEM = "BUTTON_ADD_ITEM";
const BUTTON_DELETE_ITEM = "BUTTON_DELETE_ITEM";
const BUTTON_DELETE_ALL = "BUTTON_DELETE_ALL";

const itemButtonAdd = function (item) {
    return {
        type: BUTTON_ADD_ITEM,
        item: item,
    }
};

const itemButtonDelete = function (id) {
    return {
        type: BUTTON_DELETE_ITEM,
        id: id,
    }
};

const itemButtonDeleteAll = function () {
    return {
        type: BUTTON_DELETE_ALL
    }
};

export {
    BUTTON_ADD_ITEM, BUTTON_DELETE_ITEM, BUTTON_DELETE_ALL,
    itemButtonAdd, itemButtonDelete, itemButtonDeleteAll
}