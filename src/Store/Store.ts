import { configureStore } from '@reduxjs/toolkit'
import imageSlice from './imageSlice.ts'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const Store = configureStore({
    reducer: {
        data: imageSlice,
    }
})
export const useAppDispatch: () => typeof Store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof Store.getState>> = useSelector
// useAppSelector((state)=> state.data.)