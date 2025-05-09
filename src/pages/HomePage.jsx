import React from 'react'
import Logout from '../components/Logout' 
import Seepost from '../components/Seepost'

function HomePage() {
  return (
    <div>
        This is the home page. You are login successfully
        <Seepost/>
        <Logout/>
      
    </div>
  )
}

export default HomePage
