import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
import CardDonation from "./CardDonation";
import LoadingSpinner from "../../shared/LoadingSpinner";

const DonationCampaigns = () => {

    const axiosCommon = useAxiosCommon()

    const {
        data: campaignsPet = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['campaignsPet'],
        queryFn: async () => {
            const { data } = await axiosCommon(`/campaignsPet`)
            return data
        },
    })

    // console.log(campaignsPet);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>;


    return (
        <div>
            <Helmet>
        <title>LovingPets | DonationCampaigns</title>
      </Helmet>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {campaignsPet.map(item => (
            <CardDonation key={item._id} item={item}></CardDonation>
          ))}
        </div>
        </div>
    );
};

export default DonationCampaigns;