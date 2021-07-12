
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    TextField,
    Button,
    Snackbar
} from '@material-ui/core';
import generateStyles from './styles';
import { IUser } from '../../interfaces';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import {
    NOTES
} from '../../navigation/routes';

export const SignIn: React.FC = (props: any) => {
    const styles = generateStyles(props);

    const { getUser, signIn, signOut } = useAuth();
    const { push } = useHistory();

    const [ { name }, setUser ] = useState<IUser>({
        name: 'null',
        passwordHash: "null"
    });

    useEffect(() => {
        getUser().then(setUser);
    }, []);

    const [ errorVisible, setErrorVisible ] = useState<boolean>(false);
    const [ errorText, setErrorText ] = useState<string>('');
    const error = (text: string): void => {
        setErrorText(text);
        setErrorVisible(true);
    }

    const [ password, setPassword ] = useState<string>('');

    const handleSubmit = async (): Promise<void> => {
        if (password === '') {
            error('Введите пароль');
            return;
        }

        const success = await signIn(password);

        if (success) {
            push(NOTES);
            location.reload();
        } else {
            error('Неправильный пароль');
        }
    }

    return (
        <Card>
            <CardContent>`
                <div style={{ ...styles.user, ...styles.control }}>
                    <Avatar>{name.split('')[0]}</Avatar>`
                    <Typography variant='h6'>Здравствуйте, {name}</Typography>
                </div>
                <TextField
                    type='password'
                    label='Введите пароль'
                    style={styles.control}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    variant='contained'
                    style={styles.control}
                    onClick={handleSubmit}
                >
                    Войти
                </Button>
                <Button
                    color='secondary'
                    variant='contained'
                    style={styles.control}
                    onClick={signOut}
                >
                    Выйти
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
