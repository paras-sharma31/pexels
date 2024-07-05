import { configureStore } from '@reduxjs/toolkit'
import imageSlice from './imageSlice.ts'
import videoSlice from './videoSlice.ts';
import modalSlice from './modalSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        data: imageSlice,
        videos: videoSlice,
        modal: modalSlice,

    }
})
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
// useAppSelector((state)=> state.data.)
export type RootState = ReturnType<typeof store.getState>

