import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IUser, SIGNIN_OK, SIGNIN_ERROR, UserActionTypes } from './types';

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

export function signIn(login: string, password: string, url = 'http://localhost:8080/users'): ThunkAction<Promise<void>, {}, {}, UserActionTypes>{
    return async (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
        const user = { login, password };
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        };
        
        fetch(url, options)
            .then(() => dispatch(signInOk(user)))
            .catch((err) => dispatch(signInError(err)));
    }
}
