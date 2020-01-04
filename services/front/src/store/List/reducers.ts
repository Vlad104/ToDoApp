import { IListState, ListActionTypes, ADD_ITEM, DELETE_ITEM, RESET_ALL, SAVE_STATE, LOAD_STATE, FETCH_STATE, LOADING_STATE, ERROR_STATE } from './types';

const initialState: IListState = {
    items: [],
    loading: true,
    error: false,
}

export function listReducer(state = initialState, action: ListActionTypes) : IListState {
    switch (action.type) {
        case ADD_ITEM:
            return Object.assign({}, state, {
                items: [...state.items, action.item]
            })
        case DELETE_ITEM:
            return Object.assign({}, state, {
                items: state.items.filter((item) => item.text !== action.item.text)
            })
        case RESET_ALL:
            return Object.assign({}, state, {
                items: []
            })
        case SAVE_STATE:
            localSave(state);
            return state;
        case LOAD_STATE:
            return localLoad();
        case FETCH_STATE:
            return Object.assign({}, state, { items: action.items });
        case LOADING_STATE:
            return Object.assign({}, state, { loading: action.loading });
        case ERROR_STATE:
            return Object.assign({}, state, { error: action.error });
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
