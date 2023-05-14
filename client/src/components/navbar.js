import React from "react";
 
// We import bootstrap to make our application look better.
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import '../styles/navbar.scss';
// Here, we display our Navbar
export default function Navbar() {
 return (
   <>
   <header>
    <nav className="navbar">

      <div className="menu"> 
        <NavLink to="/">
        Home
        </NavLink>

        <NavLink to="/create">
          Create tournament
        </NavLink>


      </div>

      <div className="login">

        <NavLink to="/login">     
          Login
        </NavLink>

      </div>

    </nav>
    </header>
   </>
 );
}