
import {
    IAction,
    ADD_NOTE,
    REMOVE_NOTE,
    SET_NOTES,
    SET_AUTH
} from './types';
import { INote } from '../interfaces';

export const addNote = (note: INote): IAction => ({
    type: ADD_NOTE,
    payload: note
});

export const removeNote = (id: number): IAction => ({
    type: REMOVE_NOTE,
    payload: id
});

export const setNotes = (notes: Array<INote>): IAction => ({
    type: SET_NOTES,
    payload: notes
});

export const setAuth = (auth: boolean): IAction => ({
    type: SET_AUTH,
    payload: auth
});
