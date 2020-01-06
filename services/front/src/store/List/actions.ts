import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
    ITask, ADD_TASK,
    DELETE_TASK, RESET_ALL, FETCH_TASKS,
    LOADING, FETCH_ERROR, ListActionTypes
} from './types';

export function addTask(item: ITask): ListActionTypes {
    return {
        type: ADD_TASK,
        item
    }
}

export function deleteItem(item: ITask): ListActionTypes {
    return {
        type: DELETE_TASK,
        item
    }
}

export function resetAll(): ListActionTypes {
    return {
        type: RESET_ALL
    }
}

export function stateError(bool: boolean): ListActionTypes {
    return {
        type: FETCH_ERROR,
        error: bool
    };
}

export function stateLoading(bool: boolean): ListActionTypes {
    return {
        type: LOADING,
        loading: bool
    };
}

export function stateFetchSuccess(items: ITask[]): ListActionTypes {
    return {
        type: FETCH_TASKS,
        items
    };
}

export function fetchTasks(url = 'http://localhost:8080/tasks'): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(stateLoading(true));

        fetch(url)
            .then((response) => {
                dispatch(stateLoading(false));
                
                return response.json();
            })
            .then((items) => dispatch(stateFetchSuccess(items)))
            .catch(() => dispatch(stateError(true)));
    };
}

export function createTask(item: ITask, url = 'http://localhost:8080/tasks'): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(addTask(item));
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        };

        fetch(url, options).catch(() => dispatch(stateError(true)));
    };
}

export function deleteTask(item: ITask, url = 'http://localhost:8080/tasks'): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(deleteItem(item));
        
        const options = {
            method: 'DELETE',
        };

        fetch(`${url}/${item.id}`, options).catch(() => dispatch(stateError(true)));
    };
}

export function deleteAllTasks(url = 'http://localhost:8080/tasks'): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(resetAll());
        
        const options = {
            method: 'DELETE',
        };

        fetch(url, options).catch(() => dispatch(stateError(true)));
    };
}
