
import React from 'react';

export interface IRoute {
    path: string,
    Component: React.FC,
    exact?: boolean
}

import { Login } from '../screens/Login';
import { Notes } from '../screens/Notes';

import { Register } from '../screens/Register';

// Authorized routes

export const LOGIN: string = '/';
export const ACCOUNT: string = '/account';
export const NOTES: string = '/notes';

export const authorized: Array<IRoute> = [
    {
        path: LOGIN,
        Component: Login,
        exact: true
    },
    {
        path: NOTES,
        Component: Notes
    }
];

// Unauthorized routes

export const REGISTER: string = '/';

export const unauthorized: Array<IRoute> = [
    {
        path: REGISTER,
        Component: Register,
        exact: true
    }
];
