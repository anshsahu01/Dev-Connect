


import React, { useState, useEffect } from 'react';
import Input from './Input';
import service from '../appwrite/Services';
import { Link } from 'react-router-dom';

function SearchBar({ className }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setError('');
    const getuserList = async () => {
      try {
        const response = await service.getAllUsers();
        console.log(response);
        setUsers(response);
      } catch (error) {
        setError(error.message || "Error fetching users");
      }
    };

    getuserList();
  }, []);

  const filteredUsers = searchTerm.trim() === ''
    ? []
    : users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      {/* Search Input */}
      <Input
        label="Search Users"
       
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // timeout allows click
      />

      {/* Dropdown Results */}
      {searchTerm.trim() !== '' && isFocused && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded shadow-md mt-1 max-h-60 overflow-y-auto z-10">
          {filteredUsers.length === 0 ? (
            <p className="px-4 py-2 text-gray-500">No user found</p>
          ) : (
            filteredUsers.map((user) => (
             

              <Link 
to={`/profile/${user.$id}`}
key={user.$id}
className="block py-2 border-b hover:bg-gray-100"
>{user.name}</Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;






