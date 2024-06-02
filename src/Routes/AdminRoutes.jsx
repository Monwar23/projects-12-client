import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner";

const AdminRoutes = ({children}) => {

     const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />

};

export default AdminRoutes;