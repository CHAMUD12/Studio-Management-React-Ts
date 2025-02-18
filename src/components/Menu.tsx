import { useState } from "react";
import {
  Menu as MenuIcon,
  Home,
  Users,
  Package,
  ShoppingCart,
} from "react-feather";
import { Link } from "react-router";

export function Menu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div
          className={`bg-gradient-to-r from-gray-100 to-gray-300 text-white shadow-xl ${
              isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out h-screen flex flex-col`}
      >
        <div className="p-4 flex flex-col h-full">
          <button
              onClick={toggleSidebar}
              className="text-white p-3 rounded-lg transition duration-300  hover:bg-white hover:text-black flex"
          >
            <MenuIcon
                className={`w-7 h-7 transform transition-transform ${
                    isSidebarOpen ? "rotate-180" : ""
                }`}
            />
          </button>
          {isSidebarOpen && (
              <h1 className="text-2xl font-bold text-white mt-4">STUDIO C</h1>
          )}
          <ul className="flex flex-col space-y-4 mt-6">
            <li>
              <Link
                  to=""
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 transition duration-300 hover:bg-white hover:text-black"
              >
                <Home className="w-6 h-6" />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                  to="customer"
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 transition duration-300 hover:bg-white hover:text-black"
              >
                <Users className="w-6 h-6" />
                {isSidebarOpen && <span>Customer</span>}
              </Link>
            </li>
            <li>
              <Link
                  to="instructor"
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 transition duration-300 hover:bg-white hover:text-black"
              >
                <Package className="w-6 h-6" />
                {isSidebarOpen && <span>Instructor</span>}
              </Link>
            </li>
            <li>
              <Link
                  to="place-order"
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 transition duration-300 hover:bg-white hover:text-black"
              >
                <ShoppingCart className="w-6 h-6" />
                {isSidebarOpen && <span>Place Order</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
  );
}