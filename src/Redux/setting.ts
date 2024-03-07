import { RootState } from './index';
import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const slippageDefault:string = '1.0'
export const deadlineDefault:string = '20'

const initialState:any = {
  slippage:slippageDefault,
  deadlineTime:deadlineDefault
}

export function useSlippage(): string {
  return useSelector((state: RootState) => state.setting.slippage)
}
export function useDeadline(): string {
  return useSelector((state: RootState) => state.setting.deadlineTime)
}
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeSlippage:(state,action:PayloadAction<string>)=>{
      state.slippage = action.payload
    },
    changeDeadline:(state,action:PayloadAction<string>)=>{
      state.deadlineTime = action.payload
    }
  }
})

export const { changeSlippage, changeDeadline } = settingSlice.actions
export default settingSlice.reducer

