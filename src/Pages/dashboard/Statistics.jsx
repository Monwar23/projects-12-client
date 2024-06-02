import useAdmin from "../../hooks/useAdmin";
import LoadingSpinner from "../../shared/LoadingSpinner";
import AdminStatistics from "./AdminStatistics";
import UserStatistics from "./UserStatistics";

const Statistics = () => {

    const [role, isLoading] = useAdmin()
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <>
            {role==='admin' && <AdminStatistics></AdminStatistics>}
            {role==='user' && <UserStatistics></UserStatistics>}
        </>
    );
};

export default Statistics;