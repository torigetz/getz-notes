
import { INote } from '../interfaces';
import {
    ADD_NOTE,
    REMOVE_NOTE,
    IAction,
    IState,
    SET_NOTES,
    SET_AUTH
} from './types';
import { initialState } from './initialState';

const handlers = {
    [ADD_NOTE]: (state: IState, payload: INote): IState => {
        let newState: IState = {...state};
        newState.notes = [payload,...newState.notes]

        return newState;
    },
    [SET_NOTES]: (state: IState, payload: Array<INote>): IState => {
        let newState: IState = {...state};
        newState.notes = payload;

        return newState;
    },
    [REMOVE_NOTE]: (state: IState, payload: number): IState => {
        let newState: IState = {...state};
        newState.notes = [];

        for (let note of state.notes) {
            if (note.date !== payload) {
                newState.notes.push(note);
            }
        }

        return newState;
    },
    [SET_AUTH]: (state: IState, payload: boolean): IState => {
        let newState = {...state};
        newState.isAuth = payload;
        return newState;
    }
};

export const reducer = (state: IState = initialState, { type, payload }: IAction) => handlers[type] ? handlers[type](state, payload) : state;