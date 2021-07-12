
import React, { useEffect, useState } from 'react';
import {
    Card, 
    CardContent,
    TextField,
    Typography,
    Button,
    Snackbar
} from '@material-ui/core';
import generateStyles from './styles';
import { Alert } from '@material-ui/lab'
import { useAuth } from '../../hooks/useAuth';
import md5 from 'md5';
import {
    useHistory
} from 'react-router-dom';
import {
    NOTES,
    Notes
} from '../../navigation/routes';
// import { 
//     useDispatch
// } from 'react-redux';
// import {
//     setAuth
// } from '../../store/creators';

export const SignUp: React.FC = (props: any) => {
    const styles = generateStyles(props);
    const { push } = useHistory();
    // const dispatch = useDispatch();

    const { signUp, getUsers } = useAuth();

    const [ name, setName ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ repeatPassword, setRepeatPassword ] = useState<string>('');

    const [ errorText, setErrorText ] = useState<string>('');
    const [ errorVisible, setErrorVisible ] = useState<boolean>(false);

    const error = (text: string): void => {
        setErrorText(text);
        setErrorVisible(true);
    }

    const register = async (): Promise<void> => {
        if (name === '') {
            error('Введите имя пользователя')
            return;
        }
        if (password === '') {
            error('Введите пароль');
            return;
        }
        if (repeatPassword === '') {
            error('Повторите пароль');
            return;
        }
        if (password !== repeatPassword) {
            error('Пароли не совпадают');
            return;
        }

        let users = await getUsers();

        for (let user of users) {
            if (user.name === name) {
                error('Такой пользователь уже существует');
                return;
            }
        }

        await signUp({ name, password });
    }

    const [ loginName, setLoginName ] = useState<string>('');
    const [ loginPassword, setLoginPassword ] = useState<string>('');

    const login = async (): Promise<void> => {
        if (loginName === '') {
            error('Введите логин');
            return;
        }
        if (loginPassword === '') {
            error('Введите пароль');
            return;
        }

        const users = await getUsers();

        for (let user of users) {
            if (loginName === user.name) {
                if (md5(loginPassword) === user.passwordHash) {
                    signUp({
                        name: loginName,
                        password: loginPassword
                    });
                    push(NOTES);
                } else {
                    error('Неправильный пароль');
                    return;
                }
            }
        }
        error('Такого пользователя не найдено');
    }

    return (
        <Card>
            <CardContent style={styles.wrapper}>
            <Typography
                    variant='h6'
                    style={styles.control}
                >
                    Авторизация    
                </Typography>
                <TextField
                    value={loginName}
                    onChange={e => setLoginName(e.target.value)}
                    style={styles.control}
                    label='Имя пользователя'
                />
                <TextField
                    type='password'
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    style={styles.control}
                    label='Пароль'
                />
                <Button
                    onClick={login}
                    style={styles.control}
                    variant='contained'
                >
                    Войти
                </Button>
                <Typography
                    variant='h6'
                    style={styles.control}
                >
                    Регистрация    
                </Typography>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={styles.control}
                    label='Имя пользователя'
                />
                <TextField
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={styles.control}
                    type='password'
                    label='Пароль'
                />
                <TextField
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    style={styles.control}
                    type='password'
                    label='Повторите пароль'
                />
                <Button
                    onClick={register}
                    style={styles.control}
                    variant='contained'
                >
                    Зарегистрироваться
                </Button>
                <Snackbar
                    open={errorVisible}
                    autoHideDuration={3000}
                    onClose={setErrorVisible}
                >
                    <Alert
                        onClose={setErrorVisible}
                        severity='error'
                    >
                        {errorText}
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    );
}
