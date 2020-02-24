import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    IUser, SESSION_OK, SESSION_ERROR,
    SIGNIN_OK, SIGNIN_ERROR, UserActionTypes
} from './types';
import userService from '../../services/UserService';

export function sessionOk(user: IUser): UserActionTypes {
    return {
        type: SESSION_OK,
        user
    }
}

export function sessionError(): UserActionTypes {
    return {
        type: SESSION_ERROR
    }
}

export function signInOk(user: IUser): UserActionTypes {
    return {
        type: SIGNIN_OK,
        user
    }
}

export function signInError(error: Error): UserActionTypes {
    return {
        type: SIGNIN_ERROR,
        error
    }
}

export function session(): ThunkAction<Promise<void>, {}, {}, UserActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        try {
            const user = await userService.checkSession();
            dispatch(sessionOk(user))
        } catch(err) {
            dispatch(sessionError());
        }
    }
}

export function signIn(login: string, password: string): ThunkAction<Promise<void>, {}, {}, UserActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        try {
            await userService.signIn(login, password);
            dispatch(signInOk({ login, password }))
        } catch(err) {
            dispatch(signInError(err));
        }
    }
}

export function signUp(login: string, password: string): ThunkAction<Promise<void>, {}, {}, UserActionTypes> {
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        try {
            await userService.signUp(login, password);
            dispatch(signInOk({ login, password }))
        } catch(err) {
            dispatch(signInError(err));
        }
    }
}
