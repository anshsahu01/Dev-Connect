import React from 'react'
import Logout from '../components/Logout' 
import Seepost from '../components/Seepost'
import Profilecard from '../components/Profilecard'
import SearchBar from '../components/SearchBar'


function HomePage() {
  
  return (
   
     
    <div className="flex justify-center px-6 py-4">

      <aside className="w-[260px] shrink-0 mr-6 sticky top-4 self-start h-fit">
        <Profilecard />
      </aside>
      <main className="flex-1 max-w-2xl mx-auto">
        <Seepost />
      </main>
    </div>
  )
}

export default HomePage
