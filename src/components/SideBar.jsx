import { useState } from "react";
import { Link } from "react-router-dom";

 function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div className="text-center my-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-stone-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none dark:focus:ring-blue-800"
        >
          Show navigation
        </button>
      </div>

      {/* Drawer Component */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-zinc-800 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-gray-400 uppercase">
            Menu
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg text-sm p-1.5"
          >
            <span className="sr-only">Close menu</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-3 font-medium text-gray-300 ">
          <li className="text-gray-200">
            <Link
              to="/home"
              className="block p-2 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/addpost"
              className="block p-2 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Add Post
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block p-2 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block p-2 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block p-2 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
