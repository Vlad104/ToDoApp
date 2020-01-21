import {
    IUserAuth, UserActionTypes, SIGNIN_OK,
    SIGNIN_ERROR
} from './types';

const initialState: IUserAuth = {
    user: {
        login: 'Unregistered',
        password: '',
    },
    isAuth: false,
    error: false,
}

export function userReducer(state = initialState, action: UserActionTypes): IUserAuth {
    switch (action.type) {
        case SIGNIN_OK:
            return {
                user: action.user,
                isAuth: true,
                error: false
            };
        case SIGNIN_ERROR:
            return Object.assign({}, initialState, {
                isAuth: false,
                error: true
            });
        default:
            return state;
    }
}