import { useNavigate } from 'react-router-dom';
import { ComponentType, useEffect } from 'react';
import { useIsAuth } from '../hooks/useIsAuth';

export const ProtectedRoute = <P extends {}>(Component: ComponentType<P>, props: P) => {
    const Redirect = () => {
        const isAuth = useIsAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isAuth) navigate('/login');
        }, [isAuth]);

        return <Component {...props} />;
    };

    return Redirect;
};
