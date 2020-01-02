import { combineReducers } from 'redux';
import { listReducer } from './List/reducers';

export const rootReducer = combineReducers({
    list: listReducer
})

export type AppState = ReturnType<typeof rootReducer>;
