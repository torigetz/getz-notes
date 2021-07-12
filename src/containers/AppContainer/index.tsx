
import React from 'react';
import { Navigation } from '../../navigation';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../../store';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { IStorage, useStorage } from '../../hooks/useStorage';
import { IUser } from '../../interfaces';
import { setNotes } from '../../store/creators';

export const AppContainer: React.FC = () => {
    const { isAuthorized, getUser } = useAuth();
    const { getStorage } = useStorage();

    useEffect(() => {
        if (isAuthorized) {
            getUser().then(async ({ name }: IUser) => {
                getStorage(name).then((storage: IStorage) => {
                    store.dispatch(setNotes(storage.getItems()));
                    store.subscribe(() => storage.setItems(store.getState().notes));
                });
            });
        }
    }, []);

    return (
        <StoreProvider store={store}>
            <Navigation />
        </StoreProvider>
    );
}
