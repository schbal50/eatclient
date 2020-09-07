// hocs = higher order components 
// private -> protect the components that we need to be logged in for

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const PrivateRoute = ({ component: Component, is_staff, ...rest }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            if (!isAuthenticated) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            if (!is_staff.includes(user.is_staff)) {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;