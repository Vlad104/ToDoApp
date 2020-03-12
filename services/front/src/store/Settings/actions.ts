import { IColors, CHANGE_COLORS, SettingsActionTypes } from './types';

export function changeColors(colors: IColors): SettingsActionTypes {
    return {
        type: CHANGE_COLORS,
        colors
    }
}
