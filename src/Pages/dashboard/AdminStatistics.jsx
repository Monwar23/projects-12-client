import { Helmet } from "react-helmet";
import UseAuth from "../../hooks/UseAuth";
import LoadingSpinner from "../../shared/LoadingSpinner";

const AdminStatistics = () => {
        const { user, loading } = UseAuth();

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Helmet>
                <title>LovingPets | Admin Dashboard</title>
            </Helmet>
            <div className="bg-pink-100 p-8 rounded-lg shadow-lg text-center">
                <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                    Welcome! {user?.displayName}
                </h2>
            </div>
        </div>
    );
};

export default AdminStatistics;