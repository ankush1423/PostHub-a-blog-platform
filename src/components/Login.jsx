import {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import authSrevice from '../appwrite/auth'
import {logOut,login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from "./index.js"
import { useForm } from 'react-hook-form'
import {useSelector,useDispatch} from 'react-redux'

function Login() {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const [error,setErorr] = useState(null)
     const {register,handleSubmit} = useForm()

     const login = async(data) => {
           setErorr("")
           try
           {
              const session = await authSrevice.loginUser(data)
              if(session)
              {
                const userData = await authSrevice.getCurrentUser()
                if(userData)
                {
                  await dispatch(authLogin(userData))
                }
                navigate("/")
              }
           }
           catch(error)
           {
              setErorr(error.message)
           }
     }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
             <div className='mb-2 flex justify-center'>
                  <span className='inline-block w-full max-w-[100px]'>
                     <Logo width='100%'/>
                  </span>
             </div>
             <h1 className='text-center text-2xl font-bold'>sign in to your account</h1>
             <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account?&nbsp;
                    <Link
                       to="/signup"
                       className='font-medium transition-all duration-200 hover-underline'
                    >
                      Sign up
                    </Link>         
             </p>
             {
                error && <p className='text-red-600 mt-8 text-center'>{error}</p>
             }
             <form 
               onSubmit={handleSubmit(login)}
               className='mt-8'
             >
                 <div className='space-y-5'>
                     <Input
                        label="Email : "
                        placeholder="Enter Your Name"
                        type="email"
                        {...register("email",{
                            required : true,
                            validate : {
                                matchPatern : (value) => (
                                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                                    || "Email address must be a valid address"
                                )
                            }
                        })}
                      />
                      <Input
                         label="Password : "
                         placeholder="Enter your password"
                         type="password"
                         {...register("password",{
                             required:true
                         })}
                      />
                      <Button 
                         children='submit'
                         type='submit'
                         className='w-full'
                      />
                 </div>
             </form> 
        </div>
    </div>
  )
}

export default Login