
import React from 'react';
import { SignIn } from '../../components/SignIn';
import generateStyles from './styles';

export const Login: React.FC = (props: any) => {
    const styles = generateStyles(props);

    return (
        <div style={styles.wrapper}>
            <SignIn />
        </div>
    );
}
