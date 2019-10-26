import { IListState, ListActionTypes, ADD_ITEM, DELETE_ITEM, RESET_ALL } from './types';

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
        default:
            return state
    }
}

// export type ListState = ReturnType<typeof listReducer>;
