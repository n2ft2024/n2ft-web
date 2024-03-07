import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index';

const initialState: any = {
    showmutchIsShow: false,
}
export function useShowMuch(): boolean {
    return useSelector((state: RootState) => state.showmutch.showmutchIsShow)

}
const showMuchSlice = createSlice({
    name: 'showmutch',
    initialState,
    reducers: {
        changeshowbtn: (state, action: PayloadAction<boolean>) => {
            state.showmutchIsShow = action.payload
        }
    }
})

export const { changeshowbtn } = showMuchSlice.actions
export default showMuchSlice.reducer

