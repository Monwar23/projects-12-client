import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "../../hooks/useAxiosSecures";

const AllDonation = () => {

    const axiosSecure=useAxiosSecures()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/payments`);
            return data;
        },
    });

    return (
        <div>
            <h2>all donation</h2>
        </div>
    );
};

export default AllDonation;