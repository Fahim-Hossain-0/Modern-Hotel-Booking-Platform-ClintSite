import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {

  const {user,signOutUser} = useContext(AuthContext)
    const links = <>
      <li className=''><NavLink to='/'>Home</NavLink></li>
      <li className=''><NavLink to='/rooms'>Rooms Page</NavLink></li>
      <li className=''><NavLink to='/my-booking'>My booking</NavLink></li>
      <li className=''><NavLink to='/contact'>contact</NavLink></li>
    </>
  const handleSingOut = () => {
    signOutUser().catch(error => console.error(error));
  } 
    return (
       <div className="navbar w-[95%] mx-auto py-5 text-[#F3F4F6]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className=" space-y-1 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-base ">
        {links}
      </ul>
    </div>
    <a className=" text-4xl font-black heading-font">Hotel-Motel</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="space-x-3 menu-horizontal px-1 text-base font-[600]">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
{
  user ? <button onClick={handleSingOut} className="btn btn-outline btn-warning text-base">Logout</button> : <NavLink to='/auth/login' className="btn btn-outline btn-warning">Login</NavLink>
}
  </div>
</div>
    );
};

export default Navbar;