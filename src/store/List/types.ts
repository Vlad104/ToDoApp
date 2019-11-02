export interface IListItem {
    text: string;
}

export interface IListState {
    items: IListItem[];
}

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const RESET_ALL = 'RESET_ALL';
export const SAVE_STATE = 'SAVE_STATE';
export const LOAD_STATE = 'LOAD_STATE';

interface IAddItemAction {
    type: typeof ADD_ITEM;
    item: IListItem;
}

interface IDeleteItemAction {
    type: typeof DELETE_ITEM;
    item: IListItem;
}

interface IResetAllAction {
    type: typeof RESET_ALL;
}

interface ISaveStateAction {
    type: typeof SAVE_STATE;
}

interface ILoadStateAction {
    type: typeof LOAD_STATE;
}

export type ListActionTypes = IAddItemAction | IDeleteItemAction | IResetAllAction | ISaveStateAction | ILoadStateAction;
