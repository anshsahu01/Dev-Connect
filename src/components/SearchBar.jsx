import React, { useState } from 'react'
import Input from './Input';

function SearchBar({users}) {

    const [searchTerm,setSearchTerm]=useState('');

  const filteredUsers=users.filter((user)=>{
    return user.name.toLowerCase().includes(searchTerm.toLowerCase())


  })

    
  return (
    <div>
        <input
        type="text"
        placeholder="Search users"
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length===0?(
        <p>No user found</p>
      ):(
        filteredUsers.map((user)=>(
          <p key={user.$id}>{user.name}</p>
        ))
      )
      }
        


      
    </div>
  )
}

export default SearchBar
