export interface ISettings {
    colors: IColors;
}

export interface IColors {
    font: string;
    background: string;
}

export const CHANGE_COLORS = 'CHANGE_COLORS';

interface IChangeColorsAction {
    type: typeof CHANGE_COLORS,
    colors: IColors
}

export type SettingsActionTypes = IChangeColorsAction;
