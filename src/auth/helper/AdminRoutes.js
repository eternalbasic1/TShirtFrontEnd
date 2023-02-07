import React from "react";
import { Navigate } from "react-router-dom";

 const AdminRoutes = ({isAuthenticated, children}) => {
    const {user} = isAuthenticated();
    // console.log(user);
    if(!user || user.role !== 1){
        // console.log("Going in admin ");
        return(
            <Navigate to="/" replace/>
        )
    }
    return children
   
 }

 export default AdminRoutes;