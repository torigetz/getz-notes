
import React, { useEffect } from 'react';
import { AddNote } from '../../components/AddNote';
import { Card, CardContent } from '@material-ui/core';
import generateStyles from './styles';
import { useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { INote } from '../../interfaces';
import { Note } from '../../components/Note';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../../navigation/routes';

export const Notes: React.FC = (props: any) => {
    const styles = generateStyles(props);
    const { push } = useHistory();

    const isAuth = useSelector((state: IState) => state.isAuth);
    const notes = useSelector((state: IState) => state.notes);

    // useEffect(() => {
    //     if (!isAuth) {
    //         push(LOGIN);
    //     }
    // }, []);
    
    return (
        <div>
            <Card>
                <CardContent>
                    <AddNote />
                    <Card style={styles.notes}>
                        <CardContent>
                            {notes.map((note: INote, key: number) => (
                                <Note note={note} />
                            ))}
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
