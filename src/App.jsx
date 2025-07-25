import { useEffect, useState } from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import './App.css'


import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'


import { Login,Logout } from './components/store/AuthSlice'
import authService from './appwrite/Auth'
import { useDispatch } from 'react-redux'
import SideBar from './components/SideBar';



function App() {
  const [count, setCount] = useState(0)
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((user)=>{
      if(user){
        dispatch(Login(user));
      }else{
        dispatch(Logout())
      }
    })
    .finally(()=>{
      setLoading(false);
    })

    


  },[])

  return !loading ? 
  <div className='bg-black '>
    {/* <Header/> */}
   <SideBar/>
    <main>
      
     <Outlet/>
    
    </main>
    {/* <Footer/> */}
  </div>
  : null
}

export default App
