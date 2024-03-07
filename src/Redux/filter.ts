import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState: any = {
    filterIsShow: false,
}
export function useFilterIsShow(): boolean {
    return useSelector((state: RootState) => state.filter.filterIsShow)

}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilterbtn: (state, action: PayloadAction<boolean>) => {
            state.filterIsShow = action.payload
        }
    }
})

export const { changeFilterbtn } = filterSlice.actions
export default filterSlice.reducer

