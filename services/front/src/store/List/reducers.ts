import {
    IListTask, ListActionTypes, ADD_TASK,
    DELETE_TASK, RESET_ALL, FETCH_TASKS,
    LOADING, FETCH_ERROR
} from './types';

const initialState: IListTask = {
    items: [],
    loading: true,
    error: false,
}

export function listReducer(state = initialState, action: ListActionTypes) : IListTask {
    switch (action.type) {
        case ADD_TASK:
            return Object.assign({}, state, {
                items: [...state.items, action.item]
            })
        case DELETE_TASK:
            return Object.assign({}, state, {
                items: state.items.filter((item) => item.text !== action.item.text)
            })
        case RESET_ALL:
            return Object.assign({}, state, {
                items: []
            })
        case FETCH_TASKS:
            return Object.assign({}, state, { items: action.items });
        case LOADING:
            return Object.assign({}, state, { loading: action.loading });
        case FETCH_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state
    }
}
