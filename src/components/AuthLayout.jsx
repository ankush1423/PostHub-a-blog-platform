import {useEffect , useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children,authentication=true}) {
      const navigate = useNavigate()
      const [loader,setLoader] = useState(true)
      const authStatus = useSelector(state => state.auth.status)

      useEffect(() => {
        if(authentication && authStatus !== authentication)
        {
            navigate("/login")
        }else if(!authentication && authStatus !== authentication)
        {
            navigate("/login")
        }
        setLoader(false)
      },[authStatus,navigate,authentication])

  return (
     loader ? <h1>loading....</h1> : <>{children}</>
  )
}

export default AuthLayout