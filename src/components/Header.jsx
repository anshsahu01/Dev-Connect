// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Logout } from './store/AuthSlice'; // make sure path is correct
// import Button from './Button'; // use your existing button component

// function Header() {
//   const isLoggedIn = useSelector((state) => state.auth.status);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(Logout());
//     navigate('/signin');
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       {/* Brand */}
//       <Link to="/" className="text-2xl font-bold text-blue-600">Dev Connect</Link>

//       {/* Navigation Links */}
//       <div className="flex items-center gap-4 text-gray-700">
//         <Link to="/home" className="hover:text-blue-600">Home</Link>

//         {isLoggedIn ? (
//           <>
//             <Link to="/profile" className="hover:text-blue-600">Profile</Link>
//             <Link to="/addpost" className="hover:text-blue-600">Add Post</Link>
//             <Button onClick={handleLogout}>Logout</Button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-blue-600">Login</Link>
//             <Link to="/signin" className="hover:text-blue-600">Signup</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Header;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // install via `npm install lucide-react`

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 md:px-10 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          DevConnect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/addpost" className="text-gray-700 hover:text-blue-600">Add Post</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
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


