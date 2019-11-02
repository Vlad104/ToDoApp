import { IListItem, ADD_ITEM, DELETE_ITEM, RESET_ALL, SAVE_STATE, LOAD_STATE, ListActionTypes } from './types';

export function addItem(item: IListItem): ListActionTypes {
    return {
        type: ADD_ITEM,
        item
    }
}

export function deleteItem(item: IListItem): ListActionTypes {
    return {
        type: DELETE_ITEM,
        item
    }
}

export function resetAll(): ListActionTypes {
    return {
        type: RESET_ALL
    }
}

export function saveState(): ListActionTypes {
    return {
        type: SAVE_STATE
    }
}

export function loadState(): ListActionTypes {
    return {
        type: LOAD_STATE
    }
}
