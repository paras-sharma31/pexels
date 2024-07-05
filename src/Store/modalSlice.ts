import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum ModalType {
    Video = 'Video',
    Image = 'Image'
}

interface ModalSlice {
    modalType?: ModalType,
    modalSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl' | 'full',
    id: number | null,
}

const initialState: ModalSlice = {
    modalType: undefined,
    modalSize: '6xl',
    id: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalSlice>) => {
            state.modalType = action.payload.modalType;
            state.modalSize = action.payload.modalSize;
            state.id = action.payload.id;

        },
        closeModal: (state) => {
            state.modalType = initialState.modalType;
            state.modalSize = initialState.modalSize;
            state.id = initialState.id;
        }
    }
})

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
export const getModalState = (state: RootState) => state.modal;
