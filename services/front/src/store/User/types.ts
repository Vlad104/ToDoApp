export interface IUser {
    login: string;
    password: string;
}

export interface IUserAuth {
    user: IUser;
    isAuth: boolean;
    error: boolean;
}

export const SESSION_OK = 'SESSION_OK';
export const SESSION_END = 'SESSION_END';
export const SESSION_ERROR = 'SESSION_ERROR';
export const SIGNIN_OK = 'SIGNIN_OK';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

interface ISessionOk {
    type: typeof SESSION_OK;
    user: IUser;
}

interface ISessionEnd {
    type: typeof SESSION_END;
}

interface ISessionError {
    type: typeof SESSION_ERROR;
}

interface ISingInOk {
    type: typeof SIGNIN_OK;
    user: IUser;
}

interface ISingInError {
    type: typeof SIGNIN_ERROR;
    error: Error;
}

export type UserActionTypes = ISessionOk | ISessionEnd | ISessionError | ISingInOk | ISingInError;
