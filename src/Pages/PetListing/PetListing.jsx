import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from "react-helmet";
import CardListing from "./CardListing";
import LoadingSpinner from "../../shared/LoadingSpinner";

const PetListing = () => {

    const axiosCommon=useAxiosCommon()

    const {data: pets=[], isLoading}=useQuery({
        queryKey:['pets'],
        queryFn:async()=>{
            const res=await axiosCommon.get('/pets')
            return res.data
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>


    return (
        <div>
            <Helmet>
            <title>LovingPets | PetListing</title>
            </Helmet>
           <div className="mt-10 mb-5">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
             {
                pets.map(item=><CardListing key={item._key} item={item}></CardListing>)
            }
        </div>
           </div>
        </div>
    );
};

export default PetListing;