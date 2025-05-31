import React, { useEffect,useState } from 'react'
import service from '../appwrite/Services'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/SearchBar';



function Alluserpage() {
    // const navigate=useNavigate();
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

// if(error){
//   return(
//     <div className='text-red-400 font-bold'>{error}</div>
//   )
// }
  return (
    <>
    <div>
      <SearchBar users={users}/>
    </div>
  {/* <div>
    {users.length === 0 ? (
      <p className="text-blue-700 font-bold">No user found</p>
    ) : (
      users.map((user) => (
        <p key={user.$id}>{user.name}</p> // Adjust field if necessary
      ))
    )}
  </div> */}

  </>
)
}
export default Alluserpage
