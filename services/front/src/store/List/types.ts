export interface ITask {
    id: number;
    text: string;
    created: string;
}

export interface IListTask {
    items: ITask[];
    loading: boolean;
    error: boolean;
}

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const RESET_ALL = 'RESET_ALL';
export const SAVE_STATE = 'SAVE_STATE';
export const LOAD_STATE = 'LOAD_STATE';
export const FETCH_TASKS = 'FETCH_TASKS';
export const LOADING = 'LOADING';
export const FETCH_ERROR = 'FETCH_ERROR';

interface IaddTaskAction {
    type: typeof ADD_TASK;
    item: ITask;
}

interface IDeleteItemAction {
    type: typeof DELETE_TASK;
    item: ITask;
}

interface IResetAllAction {
    type: typeof RESET_ALL;
}

interface IfetchTasksAction {
    type: typeof FETCH_TASKS;
    items: ITask[];
}

interface ILoadingStateAction {
    type: typeof LOADING;
    loading: boolean;
}

interface IErrorStateAction {
    type: typeof FETCH_ERROR;
    error: boolean;
}

export type ListActionTypes =
    IaddTaskAction | IDeleteItemAction | IResetAllAction |
    IfetchTasksAction | ILoadingStateAction | IErrorStateAction;
