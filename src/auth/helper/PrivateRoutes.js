import React from "react";
import { Navigate } from "react-router-dom";

 const PrivateRoutes = ({isAuthenticated, children}) => {
    if(isAuthenticated()){
        // console.log("Going in ");
        return(
            <Navigate to="/" replace/>
        )
    }
    return children;
   
 }

 const PrivateRoutesUser = ({isAuthenticated,children}) => {
    if(!isAuthenticated()){
        return (
            <Navigate to="/" replace/>
        )

    }
    return children;
 }


 export {PrivateRoutes,PrivateRoutesUser};