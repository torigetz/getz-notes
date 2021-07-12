
import React from 'react';
import generateStyles from './styles';

import { SignUp } from '../../components/SignUp';

export const Register: React.FC = (props: any) => {
    const styles = generateStyles(props);

    return (
        <div style={styles.wrapper}>
            <SignUp />
        </div>
    );
}
