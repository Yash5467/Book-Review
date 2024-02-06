import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars,  faXmark} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {authService} from '../../services/Auth.service.js'
import { logout } from "../../features/auth.slice.js";

function Navbar() {
  const [isNav, setIsNav] = useState(false);
  const {status}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navItemsUnauthorized = [
    {
      id: "login",
      label: "Login",
      redirection: "/login",
    },
    {
      id: "signup",
      label: "Signup",
      redirection: "/signup",
    },
  ];
const logoutHandler=async()=>{
  try {
    await authService.logout();
       dispatch(logout());
  } catch (error) {
    throw error
  }
}
  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
         to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Book Review
          </span>
        </Link>

        <button
          onClick={() => setIsNav((prev) => !prev)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100   "
        >
          <span className="sr-only">Open main menu</span>
        <span>
          <FontAwesomeIcon size="xl" icon={isNav?faXmark:faBars}  />        </span>
        </button>

        <div
          className={` ${!isNav ? "hidden" : ""} w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {!status?navItemsUnauthorized.map((item) => (
              <li className="" key={item.id}>
                <Link
                  to={item.redirection}
                  className="block py-2 px-3 md:bg-transparent  md:p-0 "
                >
                  <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                    {item.label}
                  </button>
                </Link>
              </li>
            )):
        <li className="" >
            <div
              
              className="block py-2 px-3 md:bg-transparent  md:p-0 "
            >
              <button onClick={logoutHandler} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
              Logout
              </button>
            </div>
          </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
