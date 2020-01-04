import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
    IListItem, ADD_ITEM,
    DELETE_ITEM, RESET_ALL, SAVE_STATE,
    LOAD_STATE, FETCH_STATE, LOADING_STATE,
    ERROR_STATE, ListActionTypes
} from './types';

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

export function stateError(bool: boolean): ListActionTypes {
    return {
        type: ERROR_STATE,
        error: bool
    };
}

export function stateLoading(bool: boolean): ListActionTypes {
    return {
        type: LOADING_STATE,
        loading: bool
    };
}

export function stateFetchSuccess(items: IListItem[]): ListActionTypes {
    return {
        type: FETCH_STATE,
        items
    };
}

export function fetchState(url = 'http://localhost:8080/tasks'): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(stateLoading(true));

        fetch(url)
            .then((response) => {
                dispatch(stateLoading(false));
                
                return response.json();
            })
            .then((items) => items.map((item: IListItem) => ({ text: item.text })))
            .then((items) => dispatch(stateFetchSuccess(items)))
            .catch(() => dispatch(stateError(true)));
    };
}
