import { useEffect, useState } from "react"
import conf from "./conf/config"
import { useDispatch, useSelector } from 'react-redux'
import authSrevice from "./appwrite/auth.js"
import { logOut, login } from './store/authSlice.js'
import {Header,Footer} from './components/index.js'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authSrevice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else { 
          dispatch(logOut())
        }  
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
         <div className="w-full block">
              <Header/>
              <main>
                <Outlet/>
              </main>
              <Footer/>
         </div> 
      </div>) : <div>loading....</div>
}

export default App
































