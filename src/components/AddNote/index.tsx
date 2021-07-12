
import React, { useState, useContext } from 'react';
import generateStyles from './styles';
import { useDispatch } from 'react-redux';
import {
    TextField,
    Button,
    Snackbar
} from '@material-ui/core';
import { 
    addNote
} from '../../store/creators';
import { INote } from '../../interfaces';
import { Alert } from '@material-ui/lab';

export const AddNote: React.FC = (props: any) => {
    const styles = generateStyles(props);
    const dispatch = useDispatch();

    const [ errorText, setErrorText ] = useState<string>('');
    const [ errorVisible, setErrorVisible ] = useState<boolean>(false);

    const error = (text: string): void => {
        setErrorText(text);
        setErrorVisible(true);
    }

    const [ text, setText ] = useState<string>('');

    const handleSubmit = async (): Promise<void> => {
        if (text === '') {
            error('Введите заметку');
            return;
        }
        const note: INote = { date: Date.now(), text };
        await dispatch(addNote(note));
        setText('');
    }

    return (
        <div style={styles.wrapper}>
            <TextField
                style={styles.control}
                value={text}
                onChange={e => setText(e.target.value)}
                label='Введите текст заметки'
            />
            <Button
                variant='contained'
                onClick={handleSubmit}
            >
                Добавить
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
        </div>
    );
}
