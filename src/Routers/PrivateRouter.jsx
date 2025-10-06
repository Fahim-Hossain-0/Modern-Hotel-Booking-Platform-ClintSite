import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
// import Loading from '../Components/Loading';

const PrivateRouter = ({children}) => {
    const location = useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading){
        return<Loading></Loading>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/auth/login'></Navigate>
        //  return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return children
};

export default PrivateRouter;