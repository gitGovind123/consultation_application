import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import 'antd/dist/antd.css';

import Login from './views/login';
import Layout from './components/layout';
import GenericNotFound from './views/notFound';
import PrivateRoute from './privateRoute';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/login' />
                <PrivateRoute component={Layout} path='/' />
                <Route component={GenericNotFound} path='*' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
