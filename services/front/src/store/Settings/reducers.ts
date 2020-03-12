import { IColors, CHANGE_COLORS, SettingsActionTypes } from './types';

const initialState = {
    colors: {
        fontColor: 'FFFFFF',
        backgroundColor: '181E24',
    }
}

export function settingsReducer(state = initialState, action: SettingsActionTypes) {
    switch (action.type) {
        case CHANGE_COLORS:
            return { ...initialState, ...action.colors };
        default:
            return state;
    }
}
