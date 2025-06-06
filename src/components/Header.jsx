

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // install via `npm install lucide-react`
import SearchBar from './SearchBar';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 md:px-10 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          DevConnect
        </Link>

         {/* ✅ Search Bar */}
        <div className="w-full md:w-1/3">
          <SearchBar className={'w-60 '} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/addpost" className="text-gray-700 hover:text-blue-600">Add Post</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/logout" className="text-gray-700 hover:text-blue-600">Logout</Link>
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-2 space-y-3">
          <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/addpost" className="text-gray-700 hover:text-blue-600">Add Post</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/logout" className="text-gray-700 hover:text-blue-600">Logout</Link> 
        </div>
      )}
    </header>
  );
}

export default Header;


