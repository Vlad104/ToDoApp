import { combineReducers } from 'redux';
import { listReducer } from './List/reducers';
import { userReducer } from './User/reducers';

export const rootReducer = combineReducers({
    list: listReducer,
    user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>;
