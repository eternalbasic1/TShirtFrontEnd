import React from 'react'
import Base from "../core/Base"
import { isAuthenticated } from '../auth/helper/index';
import { NavLink } from 'react-router-dom';

const AdminDashBoard = () => {
  const {user:{name, email, role}} = isAuthenticated();
  
  const adminleftSide = () => {
    return(
      <div className='card'>
        <h4 className="card-header bg-dark text-white text-center">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <NavLink 
            to="/admin/create/category"
            style={({isActive}) => {
                return {
                  backgroundColor: isActive? "orange": "",
                 
                }
              }}
            className='nav-link text-dark  text-center border border-dark rounded m-3'
            >
              Create Categories
            </NavLink>
            <NavLink 
            to="/admin/categories"
            style={({isActive}) => {
                return {
                  backgroundColor: isActive? "orange": "",
                 
                }
              }}
            className='nav-link text-dark  text-center border border-dark rounded m-3'
            >
              Manage Categories
            </NavLink>
            <NavLink 
            style={({isActive}) => {
                return {
                  backgroundColor: isActive? "orange": ""
                }
              }}
            className='nav-link text-dark text-center border border-dark rounded m-3' 
            to="/admin/create/product">
              Create Products
              </NavLink>
            <NavLink 
            style={({isActive}) => {
                return {
                  backgroundColor: isActive? "orange": ""
                }
              }}
            className='nav-link text-dark text-center border border-dark rounded m-3' 
            to="/admin/products">
              Manage Products
            </NavLink>
            <NavLink 
            style={({isActive}) => {
                return {
                  backgroundColor: isActive? "orange": ""
                }
              }}
            className='nav-link text-dark text-center border border-dark rounded m-3' 
            to="/">
              Manage Order
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }

  const adminrightSide = () => {
    return (
      <div className='card mb-4'>
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success bg-secondary mr-2 text-white">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success bg-secondary mr-2 text-white">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success bg-secondary mr-2 text-white">Role:</span> {role === 1? "Administrator" : "Manager"}
          </li>
        </ul>
      </div>
      )
  }

  return (
    <Base 
      title='AdminDashBoard'
      description='You can perform CRUD Operation and track everything from here'
      className='container bg-info p-4 rounded'
      >
        <h1> 👋 Hi {name}, Welcome back </h1>
        <div className="row">
          <div className="col-3">
          {adminleftSide()}
          </div>
          <div className="col-9">
          {adminrightSide()}
          </div>
        </div>
        
    </Base>
  )
}


export default AdminDashBoard;
