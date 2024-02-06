import {configureStore} from '@reduxjs/toolkit'
import { authslice } from '../features/auth.slice'


export const store=configureStore({
    reducer:{
        auth:authslice,
    }
})