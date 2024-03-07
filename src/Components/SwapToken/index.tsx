import { autoWidthVW } from "@/Common"
import useTranslationLanguage from "@/hooks/useTranslationLanguage"
import { useModalContext } from "@/provider/modalProvider"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn } from "../View"
import TokenList from "./TokenList"

interface SwapTokenInterface {
  editable?:Boolean,
  coin?:string,
  max?:Boolean,
  onChoose?:(info:any)=>void,
  value?:string,
  onValueChange?:(info:any)=>void,
  showBalance?:Boolean
}

export default function SwapToken({showBalance=true,coin,editable=true,max=true,onChoose,value='',onValueChange}:SwapTokenInterface){
  const {t} = useTranslationLanguage()
  const [inputValue,setInpuValue] = useState(value)
  const [selectCoin,setSelectCoin] = useState(coin)

  useEffect(()=>{
    setSelectCoin(coin)
  },[coin])

  const modalContext = useModalContext()
  function onChange(e:any){
    setInpuValue(e.target.value)
    onValueChange && onValueChange(e.target.value)
  }
  function onMax(){
  }
  function onChooseToken(){
    modalContext.show(<TokenList onClose={()=>{
      modalContext.hidden()
    }} onChoose={(tokenInfo:any)=>{
      setSelectCoin(tokenInfo.name)
      onChoose && onChoose(tokenInfo)
    }}/>,{
      style:{
        justifyContent:'flex-end'
      }
    })
  }
  return <Content>
    {showBalance && <FlexViewBetween>
      <div>{t('Balance')}</div>
      <div>0</div>
    </FlexViewBetween>}
    <SwapView>
      <FlexView style={{height:'100%'}}>
        <LeftView onClick={onChooseToken}>
          {selectCoin ? <FlexView>
            <Icon src={`/tokens/${selectCoin}.png`}>
            </Icon>
            <div>{selectCoin}</div>
          </FlexView> : <div>{t('Celect Token')}</div>}
        </LeftView>
        <Arrow src={'/images/arrowdown.png'}>
        </Arrow>
        <LineV/>
        {max && <MaxButton onClick={onMax}>
          <div>{t('MAX')}</div>
        </MaxButton>}
      </FlexView>
      <Input disabled={!editable} value={inputValue} placeholder="0.00" onChange={onChange}/>
    </SwapView>
  </Content>
}
const Input = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:100%;
  margin-left:${autoWidthVW(20)};
  color:#fff;
  font-size:${autoWidthVW(24)};
  font-family:OutfitMedium;
  text-align:right;
  @media (max-width: 768px) {
    margin-left:${autoWidthVW(20)};
    font-size:${autoWidthVW(14)};
  }
`
const MaxButton = styled(FlexViewCenter)`
  width:fit-content;
  :hover {
    opacity:0.8
  };
  cursor:pointer
`
const LineV = styled.div`
  background:#989DAA;
  width:1px;
  height:${autoWidthVW(48)};
  margin:0 ${autoWidthVW(20)};
  @media (max-width: 768px) {
    height:${autoWidthVW(24)};
    margin:0 ${autoWidthVW(10)};
  }
`
const LeftView = styled(FlexView)`
  width:${autoWidthVW(180)};
  cursor:pointer;
  :hover {
    opacity:0.8
  };
  @media (max-width: 768px) {
    width:${autoWidthVW(90)};
  };
`
const Arrow = styled.img`
  width: ${autoWidthVW(23)};
  height: ${autoWidthVW(16)};
  @media (max-width: 768px) {
    width: ${autoWidthVW(11)};
    height: ${autoWidthVW(8)};
  }
`
const Icon = styled.img`
  width: ${autoWidthVW(48)};
  height: ${autoWidthVW(48)};
  margin-right:${autoWidthVW(16)};
  @media (max-width: 768px) {
    width: ${autoWidthVW(24)};
    height: ${autoWidthVW(24)};
    margin-right:${autoWidthVW(10)};
  }
`
const Content = styled(FlexViewColumn)`
  width:100%;
  @media (max-width: 768px) {
    width: ${autoWidthVW(300)};
  };
`
const SwapView = styled(FlexViewBetween)`
  width: 100%;
  height:${autoWidthVW(80)};
  background: #14161E;
  border-radius: ${autoWidthVW(16)};
  margin-top:${autoWidthVW(8)};
  padding:0 ${autoWidthVW(24)};
  @media (max-width: 768px) {
    height:${autoWidthVW(50)};
    border-radius: ${autoWidthVW(8)};
    margin-top:${autoWidthVW(8)};
    padding:0 ${autoWidthVW(12)};
  }
`