export interface IListItem {
    text: string;
}

export interface IListState {
    items: IListItem[];
}

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const RESET_ALL = 'RESET_ALL';

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

export type ListActionTypes = IAddItemAction | IDeleteItemAction | IResetAllAction;
