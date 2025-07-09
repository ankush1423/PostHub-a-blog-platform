import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { login as authLogin, login, logOut } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authSrevice from '../appwrite/auth'
import { Input, Button, Logo } from './index.js'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const signUp = async (data) => {
        setError("")
        try {
            const userData = await authSrevice.createAccount(data)
            if (userData) {
                const userData = await authSrevice.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h1 className='text-center text-2xl font-bold'>sign up to your account</h1>
                <p className='mt-2 text-center text-base text-black/60'>
                    you have any account?&nsp;
                    <Link
                        to="/login"
                        className='font-medium transition-all duration-200 hover-underline'
                    >
                        sign in
                    </Link>
                </p>
                {
                    error && <p className='text-red-600 mt-8 text-center'>{error}</p>
                }
                <form onSubmit={handleSubmit(signUp)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name : "
                            type="text"
                            placeholder="enter your full Name..."
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email : "
                            type="email"
                            placeholder="Enter the email..."
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => (
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
                                        || "Email address must be a valid address"
                                    )
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="enter the password..."
                            {...register("password", {
                                required: true
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

export default Signup