# Pet Adoption Website

## Live Link: https://loving-pets.netlify.app/

## Description :

The Pet Adoption Platform is a comprehensive web application designed to facilitate pet adoption and donation campaigns. It features a user-friendly interface with a 3-column grid layout for browsing available pets, enhanced by search and category filters. Each pet's profile page includes detailed information and an integrated adoption form that pre-fills with user and pet data for easy submission and database storage. The platform also includes an infinite-scrolling Donation Campaigns Page, displaying ongoing campaigns with details like pet names, images, donation goals, and current donations, alongside an "Adopt" button. Robust authentication supports email/password login, social logins (Google, Facebook, GitHub), and JWT for secure access control, distinguishing between user and admin roles. User and admin dashboards offer functionalities for managing pets, adoption requests, donation campaigns, and user roles, ensuring smooth operation and administration of the platform.


## Top Features : 

- Pet Listing with Search: Display available pets in a 3-column grid layout. Include a search field and dropdown for filtering pets by name and category.
- Pet Details and Adoption Process: Provide detailed information about each pet, Include an "Adopt" button that opens a modal form for users to submit adoption requests. Automatically fill pet and user details in the adoption form and save the request to the database.
- Donation Campaigns Page: Display ongoing donation campaigns in a 3-column grid layout. Each campaign card includes pet name, image, maximum donation amount, donated amount, and a "View Details" button.
Implement infinite scrolling to load more campaigns as the user scrolls.
- Authentication and User Roles: Implement email and password authentication with error handling. Provide additional login methods (e.g., Google, Facebook, GitHub). Use JWT for authentication and store the access token securely. Define user roles with different permissions (e.g., admin and user).
- User and Admin Dashboards: Create a user dashboard with pages for adding pets, viewing added pets, adoption requests, creating and viewing donation campaigns, and viewing donations. Create an admin dashboard with additional capabilities to manage users, pets, and donation campaigns, including editing, deleting, and updating statuses.

## Technologies Used :

- Front-end:
HTML, CSS, Tailwind CSS
JavaScript, React
Responsive Design

- Back-end:
Node.js, Express.js
MongoDB

- Authentication:
Firebase Authentication

- Payment:
  Stripe

## How to Run  :
- git clone
- npm install
- create .env.local
- in .env.local file updated:
  - VITE_APP_URL=your localhost url
  - VITE_APIKEY=Your firebase code
  - VITE_AUTHDOMAIN=Your firebase code
  - VITE_PROJECTID=Your firebase code
  - VITE_STORAGEBUCKET=Your firebase code
  - VITE_MESSAGINGSENDERID=Your firebase code
  - VITE_APPID=Your firebase code
  - VITE_IMGBB_API_KEY=your imgbb key
  - VITE_Payment_Gateway_PK=your payment gateway key
- npm run dev
- proper run go to Server : [Server Site](https://github.com/Monwar23/project-12-server) and updated all fetch url to localhost
