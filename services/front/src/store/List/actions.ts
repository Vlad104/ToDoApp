import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
    ITask, ADD_TASK,
    DELETE_TASK, RESET_ALL, FETCH_TASKS,
    LOADING, FETCH_ERROR, ListActionTypes
} from './types';
import taskService from '../../services/TaskService';

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

export function fetchTasks(): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(stateLoading(true));

        try {
            const tasks = await taskService.fetch();
            dispatch(stateLoading(false));
            dispatch(stateFetchSuccess(tasks));
        } catch (err) {
            dispatch(stateError(true));
        }
    };
}

export function createTask(item: ITask): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(addTask(item));

        try {
            await taskService.create(item);
        } catch (err) {
            dispatch(stateError(true));
        }
    };
}

export function deleteTask(item: ITask): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(deleteItem(item));
        
        try {
            await taskService.delete(item);
        } catch (err) {
            dispatch(stateError(true));
        }
    };
}

export function deleteAllTasks(): ThunkAction<Promise<void>, {}, {}, ListActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
        dispatch(resetAll());
        
        try {
            await taskService.deleteAll();
        } catch (err) {
            dispatch(stateError(true));
        }
    };
}
