import { IListState, ListActionTypes, ADD_ITEM, DELETE_ITEM, RESET_ALL, SAVE_STATE, LOAD_STATE } from './types';

const initialState: IListState = {
    items: []
}

export function listReducer(state = initialState, action: ListActionTypes) : IListState {
    switch (action.type) {
        case ADD_ITEM:
            return {
                items: [...state.items, action.item]
            }
        case DELETE_ITEM:
            return {
                items: state.items.filter((item) => item.text !== action.item.text)
            }
        case RESET_ALL:
            return {
                items: []
            }
        case SAVE_STATE:
            localSave(state);
            return state;
        case LOAD_STATE:
            return localLoad();
        default:
            return state
    }
}

function localSave(state: IListState) {
    localStorage.list = JSON.stringify(state);
}

function localLoad() {
    return localStorage.list ? JSON.parse(localStorage.list) : initialState;
}
