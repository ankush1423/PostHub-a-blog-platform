import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import authSrevice from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'

function Logoutbtn() {
      const dispatch = useDispatch()
      const logOutHandler = () => {
          authSrevice.logOut()
                     .then(() => {
                        dispatch(logOut())
                     })
      }
  return (
    <button
     className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
     onClick={logOutHandler}
     >
        LogOut
     </button>
  )
}

export default Logoutbtn