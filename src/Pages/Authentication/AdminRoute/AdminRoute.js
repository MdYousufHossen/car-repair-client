import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isAdmin, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) {
        return <Spinner animation="grow" variant="dark" />
    }
    if (user.email && isAdmin) {
        return children;
    }
    return <Navigate to="/dashboard" state={{ from: location }} />;
};

export default AdminRoute;