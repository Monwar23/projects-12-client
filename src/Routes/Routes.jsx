import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import DonationCampaigns from "../Pages/donationCampaigns/DonationCampaigns";
import Login from "../Pages/Single/Login";
import Register from "../Pages/Single/Register";
import ErrorPage from "../shared/ErrorPage";
import Details from "../Pages/PetListing/Details";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/petListing',
            element:<PetListing></PetListing>
        },
        {
            path:'/donationCampaigns',
            element:<DonationCampaigns></DonationCampaigns>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<Register></Register>
        },
        {
          path:'/details/:id',
          element:<Details></Details>,
          loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/pets/${params.id}`)

      },
      ]
    },
  ]);