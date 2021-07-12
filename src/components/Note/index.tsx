
import React from 'react';
import generateStyles from './styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@material-ui/core';
import { INote } from '../../interfaces';
import moment from 'moment';
import { Delete } from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { removeNote } from '../../store/creators';

interface INoteComponent {
    note: INote
}

export const Note: React.FC<INoteComponent> = (props) => {
    const styles = generateStyles(props);
    const dispatch = useDispatch();

    const { note: { text, date } } = props;

    const formatDate = moment(date).format('D.M.YYYY, hh:mm:ss');

    const deleteNote = (): void => {
        dispatch(removeNote(date));
    }

    return (
        <Card style={styles.wrapper}>
            <CardContent>
                <Typography variant='h6'>Заметка от {formatDate}</Typography>
                <Typography>{text}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    color='secondary'
                    startIcon={<Delete />}
                    onClick={deleteNote}
                >
                    Удалить
                </Button>
            </CardActions>
        </Card>
    );
}
