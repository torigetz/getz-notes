
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import {
    authorized,
    IRoute,
    unauthorized
} from './routes';

export const Navigation: React.FC = () => {
    const { isAuthorized } = useAuth();

    return (
        <Router>
            <Navbar />
            <Switch>
                {
                isAuthorized
                ?
                    authorized.map(({ path, Component, exact }: IRoute, key: number) => (
                        <Route
                            key={key}
                            path={path}
                            component={Component}
                            exact={exact || false}
                        />
                    ))
                :
                    unauthorized.map(({ path, Component, exact }: IRoute, key: number) => (
                        <Route
                            key={key}
                            path={path}
                            component={Component}
                            exact={exact || false}
                        />
                    ))
                }
            </Switch>
        </Router>
    );
}
