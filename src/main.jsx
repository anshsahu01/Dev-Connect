import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import { Provider } from 'react-redux'
import store from './components/store/store.js'
import SignInPage from './pages/SignInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Profile from './pages/Profile'
import Addpostpage from './pages/Addpostpage'
import Logout from './components/Logout'
import MessagePage from './pages/MessagePage'
import Dynamicprofile from './components/Dynamicprofile'






const router=createBrowserRouter(
  [
    {

      path:"/",
      element: <App />,
      children:[
        {
          path:"/home",
          element:<HomePage/>

        },
        {
          path:"/",
          element:<LoginPage/>
        },

        {
          path:"/signin",
          element:<SignInPage/>
        },

        {
          path:"/profile",
          element:<Profile/>
        },

        {
          path:"/addpost",
          element:<Addpostpage/>
        },

        {
          path:"/logout",
          element:<Logout/>
        },
        {
          path:"/messages",
          element:<MessagePage/>
        },
        {
          path:"/profile/:userId",
          element:<Dynamicprofile/>
        }
        
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    
     
  <RouterProvider router={router}/>

 
  </Provider>

)
