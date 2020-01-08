import {
    IUserAuth, UserActionTypes, SIGNIN_OK,
    SIGNIN_ERROR
} from './types';

const initialState: IUserAuth = {
    user: {
        login: 'Unregistered',
        password: '',
    },
    error: false,
}

export function userReducer(state = initialState, action: UserActionTypes): IUserAuth {
    switch (action.type) {
        case SIGNIN_OK:
            return {
                user: action.user,
                error: false
            };
        case SIGNIN_ERROR:
            return Object.assign({}, initialState, {
                error: true
            });
        default:
            return state;
    }
}
