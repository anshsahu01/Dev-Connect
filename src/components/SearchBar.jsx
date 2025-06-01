import React, { useState,useEffect } from 'react'
import Input from './Input';
import service from '../appwrite/Services'

function SearchBar({className}) {

    const [searchTerm,setSearchTerm]=useState('');
    
    const [users,setUsers]=useState([]);
        const [error,setError]=useState('');
    
        
    
        useEffect(()=>{
          setError('');
        const getuserList = async()=>{
          try {
          const response=await service.getAllUsers();
            setUsers(response);
    
            console.log(response);
          
        } catch (error) {
          setError(error);
          throw error;
          
        }
            
        }
    
    
        getuserList();
    
        },
    [])
  
  const filteredUsers=searchTerm.trim()===""?
  []:
  users.filter((user)=>(
 user.name.toLowerCase().includes(searchTerm.toLowerCase())


  ))

  console.log("Filtered USERS",filteredUsers);

    
  return (
  
     <div>
      <Input
      className={` ${className}`}
        label="Search Users"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm.trim() !== '' && (
        filteredUsers.length === 0 ? (
          <p>No user found</p>
        ) : (
          filteredUsers.map((user) => (
            <p key={user.$id}>{user.name}</p>
          ))
        )
      )}
    </div>
  )
}

export default SearchBar
