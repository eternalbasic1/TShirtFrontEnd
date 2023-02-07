import React from 'react';
import {Navigate, NavLink} from "react-router-dom";
import { signout, isAuthenticated } from '../auth/helper';


const Menu = () => (
   
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/cart'>Cart</NavLink>
            </li>
            <li className="nav-item">
                { (isAuthenticated().user) && (<NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/user/dashboard'>Dashboard</NavLink>)}
            </li>
            <li className="nav-item">
                { (isAuthenticated().user && isAuthenticated().user.role === 1) && (<NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/admin/dashboard'>A. Dashboard</NavLink>)}
            </li>
            <li className="nav-item">
            {!isAuthenticated() &&(
                <NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/signup'>SignUp</NavLink>
            )}
            </li>
            <li className="nav-item">
            {!isAuthenticated() &&(<NavLink 
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link' to='/signin'>SignIn</NavLink>)} 
            </li>
             { isAuthenticated() &&(
                <li className="nav-item ">
                    {/* <span
                    className='nav-link text-warning'
                    onClick={()=>{
                        signout(() =>{
                            return <Routes><Route exact path="/" element={<Navigate to="/" />} /></Routes>
                        })
                    }}
                    >
                        Signout
                    </span> */}
                <NavLink
                style={({isActive})=>({
                    color: isActive? "#2ecc72" :"#FFFFFF",
                })}
                className='nav-link text-warning' to={'/signout'} onClick={()=>{
                    signout(() => {
                        Navigate({to: "/"}); //TODO: Definetly there is something here to fix it as of now it is deleting token and turning of signout button, but not sure that it might not always redirect to home page it was redirecting to last visited page
                    })
                }} >Sign Out</NavLink>
            </li>
             )}
        </ul>
    </div>
)


export default Menu;