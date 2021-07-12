
import { isEmpty } from 'lodash';
import { useState } from 'react';
import md5 from 'md5';
import { IUser } from '../interfaces';

interface IForm {
    name: string,
    password: string
}

const SESSION_PATH = 'session';
const USERS_PATH: string = 'users';

export const useAuth = () => {
    const [ isAuthorized, setAuth ] = useState<boolean>(!isEmpty(JSON.parse(localStorage.getItem(SESSION_PATH) || '{}')));

    const addUser = (user: IUser) => {
        let users = JSON.parse(localStorage.getItem(USERS_PATH) || '[]');
        users.push(user);
        localStorage.setItem(USERS_PATH, JSON.stringify(users));
    }

    const signUp = async ({ name, password }: IForm): Promise<void> => {
        const user: IUser = {
            name,
            passwordHash: md5(password)
        };
        localStorage.setItem(SESSION_PATH, JSON.stringify(user));
        setAuth(true);
        addUser(user);
        location.reload();
    };

    const signIn = async (password: string): Promise<boolean> => {
        const { passwordHash } = JSON.parse(localStorage.getItem(SESSION_PATH) || '{}');
        return md5(password) === passwordHash;
    }

    const signOut = async (): Promise<void> => {
        localStorage.removeItem(SESSION_PATH);
        setAuth(false);
        location.reload();
    }

    const getUser = async (): Promise<IUser> => {
        return JSON.parse(localStorage.getItem(SESSION_PATH) || '{}');
    }

    const getUsers = async (): Promise<IUser[]> => {
        return JSON.parse(localStorage.getItem(USERS_PATH) || '[]');
    }

    return {
        isAuthorized,
        signUp,
        signIn,
        signOut,
        getUser,
        getUsers
    };
}
