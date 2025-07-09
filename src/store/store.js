import { configureStore } from '@reduxjs/toolkit'
import {authReducers} from './authSlice.js'

export const store = configureStore({
    reducer: {
        auth : authReducers
    }
})