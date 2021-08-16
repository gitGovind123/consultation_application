import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuth = localStorage.getItem('isAuth');
    return (
        <Route {...rest} render={propsData => (
            JSON.parse(isAuth) ?
                <Component {...propsData} />
                : <Redirect to='/login' />
        )} />
    );
};

export default PrivateRoute;