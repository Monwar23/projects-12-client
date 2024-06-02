import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const PrivateRoutes = ({children}) => {

    const {user,loading}=UseAuth()
    const location=useLocation()

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user){
        return children
    }
    return <Navigate to='/login' state={location.pathname} replace='true'></Navigate>
};

export default PrivateRoutes;