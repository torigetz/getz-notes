
import { INote } from "../interfaces";

export interface IState {
    isAuth: boolean,
    notes: Array<INote>
};

export interface IAction {
    type: string,
    payload?: any
};

export const SET_NOTES: string = 'SET_NOTES';
export const ADD_NOTE: string = 'ADD_TODO';
export const REMOVE_NOTE: string = 'REMOVE_NOTE';
export const SET_AUTH: string = 'SET_AUTH';
