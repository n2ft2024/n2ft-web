import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/Hooks/useTranslationLanguage"
import { changeDeadline, changeSlippage, deadlineDefault, slippageDefault, useDeadline, useSlippage } from "@/Redux/setting"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn, SpaceHeight } from "../View"

export default function Slippage({onClose}:any){
  const {t} = useTranslationLanguage()
  const [slippageValue,setSlippageValue] = useState(useSlippage())
  const [deadlineTime,setDeadlingTime] = useState(useDeadline())
  const dispatch = useDispatch()
  function onSlippageInputChange(e:any){
    setSlippageValue(e.target.value)
  }
  function onSlippageInputBlur(){
    if (Number(slippageValue) <= 0){
      setSlippageValue(slippageDefault)
      dispatch(changeSlippage(slippageDefault))
    }else {
      dispatch(changeSlippage(slippageValue))
    }
  }
  function onSlippagetTimeChange(e:any){
    setDeadlingTime(e.target.value)
  }
  function onSlippagetTimeBlur(){
    if (Number(deadlineTime) < Number(deadlineDefault)){
      setDeadlingTime(deadlineDefault)
      dispatch(changeDeadline(deadlineDefault))
    }else {
      dispatch(changeDeadline(deadlineTime))
    }
  }
  return <SlippageView>
    <FlexViewBetween>
      <div>{t('Trad Settings')}</div>
      <Close onClick={onClose}>
        <Image src={'/images/close.png'} fill alt=''/>
      </Close>
    </FlexViewBetween>
    <SpaceHeight height={24}/>
    <div>{t('Slippage Tolerance')}</div>
    <SpaceHeight height={12}/>
    <FlexView>
      <SlippageItem select={slippageValue == '0.1'} onClick={()=>{
        setSlippageValue('0.1')
        dispatch(changeSlippage('0.1'))
      }}>
        <div>0.1</div>
      </SlippageItem>
      <SlippageItem select={slippageValue == '0.5'} onClick={()=>{
        setSlippageValue('0.5')
        dispatch(changeSlippage('0.5'))
      }}>
        <div>0.5</div>
      </SlippageItem>
      <SlippageItem select={slippageValue == '1.0'} onClick={()=>{
        setSlippageValue('1.0')
        dispatch(changeSlippage('1.0'))
      }}>
        <div>1.0</div>
      </SlippageItem>
      <SlippageItem select={
        slippageValue != '1.0' && slippageValue != '0.1' && slippageValue != '0.5'
      }>
        <SlippageInput value={slippageValue} onChange={onSlippageInputChange} onBlur={onSlippageInputBlur}/>
        <div>%</div>
      </SlippageItem>
    </FlexView>
    <SpaceHeight height={24}/>
    <FlexViewBetween>
      <div>{t('Tx deadline (mins)')}</div>
      <SlippageTimeView select={false}>
        <SlippageInput value={deadlineTime} onChange={onSlippagetTimeChange} onBlur={onSlippagetTimeBlur}/>
        <div>MIN</div>
      </SlippageTimeView>
    </FlexViewBetween>
  </SlippageView>
}
const SlippageInput = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:100%;
  color:#fff;
`
const SlippageItem = styled(FlexViewCenter)<{
  select:Boolean
}>`
  background: ${({select})=>select?'#FFA845':'#242837'};
  border-radius: ${autoWidthVW(16)};
  width:fit-content;
  padding:${autoWidthVW(10)} ${autoWidthVW(24)};
  cursor:pointer;
  margin-right:${autoWidthVW(24)};
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(8)};
    padding:${autoWidthVW(5)} ${autoWidthVW(12)};
    margin-right:${autoWidthVW(12)};
  }
`
const SlippageTimeView = styled(SlippageItem)`
  width:${autoWidthVW(400)};
  background:#242837;
  margin-right:0;
  @media (max-width: 768px) {
    width:${autoWidthVW(100)};
  }
`
const SlippageView = styled(FlexViewColumn)`
  width:${autoWidthVW(1440)};
  background: linear-gradient(0deg, #404866, #404866);
  border-radius: ${autoWidthVW(48)};
  padding:${autoWidthVW(28)} ${autoWidthVW(40)};
  @media (max-width: 768px) {
    width:90%;
    border-radius: ${autoWidthVW(24)};
    padding:${autoWidthVW(14)} ${autoWidthVW(20)};
  }
`
const Close = styled(FlexView)`
  width:${autoWidthVW(48)};
  height:${autoWidthVW(48)};
  cursor:pointer;
  @media (max-width: 768px) {
    width:${autoWidthVW(24)};
    height:${autoWidthVW(24)};
  }
`