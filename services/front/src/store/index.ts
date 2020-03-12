import { combineReducers } from 'redux';
import { listReducer } from './List/reducers';
import { userReducer } from './User/reducers';
import { settingsReducer } from './Settings/reducers';

export const rootReducer = combineReducers({
    list: listReducer,
    user: userReducer,
    settings: settingsReducer,
})

export type AppState = ReturnType<typeof rootReducer>;
