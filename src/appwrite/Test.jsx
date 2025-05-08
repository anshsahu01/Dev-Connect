import React, {useEffect} from 'react'
import authService from './auth'

function Test() {
    useEffect(()=>{
        authService.createAccount(
            {
                email:'ybl@gmail.com',
                password:'shreya@uiuiuiuiui',
                name:"shreya"
            }
        )
        .then(()=>{
            console.log("name:",this.name,"account created");
        })
        .catch((error)=>{
            console.log("error in creating account",error);
        })

    },[])
    
  return (
    <div>
        Testing authService
      
    </div>
  )
}

export default Test
