export interface IUser {
    login: string;
    password: string;
}

export interface IUserAuth {
    user: IUser;
    isAuth: boolean;
    error: boolean;
}

export const SIGNIN_OK = 'SIGNIN_OK';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

interface ISingInOk {
    type: typeof SIGNIN_OK;
    user: IUser;
}

interface ISingInError {
    type: typeof SIGNIN_ERROR;
    error: Error;
}

export type UserActionTypes = ISingInOk | ISingInError;
