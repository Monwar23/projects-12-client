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
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import Statistics from "../Pages/dashboard/Statistics";
import AddAPets from "../Pages/dashboard/AddAPets";
import MyAddedPets from "../Pages/dashboard/MyAddedPets";
import AdoptionRequest from "../Pages/dashboard/AdoptionRequest";
import CreateDonationCampaign from "../Pages/dashboard/CreateDonationCampaign";
import MyDonationCampaign from "../Pages/dashboard/MyDonationCampaign";
import MyDonation from "../Pages/dashboard/MyDonation";
import AdminRoutes from "./AdminRoutes";
import ManageUsers from "../Pages/dashboard/ManageUsers";
import AllPets from "../Pages/dashboard/AllPets";
import AllDonation from "../Pages/dashboard/AllDonation";
import UpdatePets from "../Pages/dashboard/UpdatePets";

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
    {
      path:'/dashboard',
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[
        {
          index:true,
          element:<PrivateRoutes><Statistics></Statistics></PrivateRoutes>
        },
        {
          path:'addAPets',
          element:<PrivateRoutes><AddAPets></AddAPets></PrivateRoutes>
        },
        {
          path:'myAddedPets',
          element:<PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes>
        },
        {
          path:'adoptionRequest',
          element:<PrivateRoutes><AdoptionRequest></AdoptionRequest></PrivateRoutes>
        },
        {
          path:'createDonationCampaign',
          element:<PrivateRoutes><CreateDonationCampaign></CreateDonationCampaign></PrivateRoutes>
        },
        {
          path:'myDonationCampaigns',
          element:<PrivateRoutes><MyDonationCampaign></MyDonationCampaign></PrivateRoutes>
        },
        {
          path:'myDonations',
          element:<PrivateRoutes><MyDonation></MyDonation></PrivateRoutes>
        },
        {
          path:'user',
          element:<PrivateRoutes><AdminRoutes><ManageUsers></ManageUsers></AdminRoutes></PrivateRoutes>
        },
        {
          path:'allPets',
          element:<PrivateRoutes><AdminRoutes><AllPets></AllPets></AdminRoutes></PrivateRoutes>
        },
        {
          path:'allDonation',
          element:<PrivateRoutes></PrivateRoutes>
        },
        {
          path:'updatePets/:id',
          element:<PrivateRoutes><UpdatePets></UpdatePets></PrivateRoutes>,
          loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/allPets/${params.id}`)
        },
        
      ]
    }
  ]);