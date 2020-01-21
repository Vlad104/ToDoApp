import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IUser, SIGNIN_OK, SIGNIN_ERROR, UserActionTypes } from './types';
import userService from '../../services/UserService';

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

export function signIn(login: string, password: string): ThunkAction<Promise<void>, {}, {}, UserActionTypes>{
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        try {
            console.log({ login, password });
            await userService.signIn(login, password);
            console.log({ login, password });
            dispatch(signInOk({ login, password }))
        } catch(err) {
            dispatch(signInError(err));
        }
    }
}

export function signUp(login: string, password: string): ThunkAction<Promise<void>, {}, {}, UserActionTypes>{
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        try {
            await userService.signUp(login, password);
            dispatch(signInOk({ login, password }))
        } catch(err) {
            dispatch(signInError(err));
        }
    }
}
