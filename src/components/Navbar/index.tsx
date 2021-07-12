
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import generateStyles from  './styles';
import {
    useAuth
} from '../../hooks/useAuth';
import { NOTES } from '../../navigation/routes';
import {
    Notes,
    ExitToApp
} from '@material-ui/icons'
import {
    useHistory
} from 'react-router-dom';
import {
    REGISTER
} from '../../navigation/routes';

export const Navbar: React.FC = (props: any) => {
    const styles = generateStyles(props);
    const { isAuthorized, signOut } = useAuth();
    const { push } = useHistory();

    const quit = (): void => {
        push(REGISTER);
        signOut();
    }

    return (
        <AppBar position='static' style={styles.wrapper}>
            <Toolbar>
                <Notes />
                <Typography variant='h6'>
                    Getz Notes
                </Typography>
                {
                    isAuthorized
                    &&
                    location.pathname === NOTES
                    &&
                    <Button
                        style={styles.quit}
                        color='inherit'
                        onClick={quit}
                        startIcon={<ExitToApp />}
                    >
                        Выйти
                    </Button>
                }
            </Toolbar>
        </AppBar>
    );
};
