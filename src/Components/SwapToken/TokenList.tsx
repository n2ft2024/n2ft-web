import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import * as _ from 'lodash';
import { useNetwork } from "wagmi"
import { autoWidthVW, swapTokens } from "@/Common";
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
import { FlexView, FlexViewBetween, FlexViewCenter, FlexViewColumn } from "../View";

export default function TokenList({onClose,onChoose}:any){
  const {t} = useTranslationLanguage()
  const [tokenList,setTokenList] = useState(swapTokens)
  const {chain = {id: 56}} = useNetwork()
  const onChange = _.debounce((e:any)=>{
    if (e.target.value.startsWith('0x') || e.target.value.startsWith('0X')){
      const filterArr = swapTokens.filter((item:any)=>{
        return item.value[chain.id].toUpperCase() == e.target.value.toUpperCase()
      })
      setTokenList(filterArr)
    }else {
      const filterArr = swapTokens.filter((item:any)=>{
        return item.name.indexOf(e.target.value.toUpperCase()) > -1
      })
      setTokenList(filterArr)
    }
  },500)

  function onChooseToken(index:number){
    onChoose && onChoose(tokenList[index])
    onClose && onClose()
  }

  return <TokenView className="animate__animated animate__fadeInUp animate__faster">
    <FlexViewBetween>
      <div>{t('Select a Token')}</div>
      <Close onClick={onClose}>
        <Image src={'/images/close.png'} fill alt=''/>
      </Close>
    </FlexViewBetween>
    <SearchView>
      <Close>
        <Image src={'/images/search.png'} fill alt=''/>
      </Close>
      <Input placeholder={t('Search Name or paste address')} onChange={onChange}/>
    </SearchView>
    {
      tokenList.length == 0 ? <FlexViewCenter>
      <div>{t('no result')}</div>
      </FlexViewCenter> : tokenList.map((item:any,index:number)=>{
        return <Item key={index+'tokenlist'} onClick={()=>onChooseToken(index)}>
          <FlexView>
            <Close>
              <Image src={`/tokens/${item}.png`} fill alt=''/>
            </Close>
            <div>{item.name}</div>
          </FlexView>
          {index != tokenList.length - 1 && <Line/>}
        </Item>
      })
    }
  </TokenView>
}
const Item = styled(FlexViewColumn)`
  width:100%;
  cursor:pointer;
  :hover {
    opacity:0.8
  }
`
const Line = styled.div`
  background:#868AAE;
  width:100%;
  height:1px;
  margin:${autoWidthVW(24)} 0;
  @media (max-width: 768px) {
    margin:${autoWidthVW(12)} 0;
  }
`
const Input = styled.input`
  outline: none;
  outline: none;
  border: none;
  background: transparent;
  width:100%;
  margin-left:${autoWidthVW(24)};
  color:#fff;
  font-size:${autoWidthVW(28)};
  @media (max-width: 768px) {
    margin-left:${autoWidthVW(12)};
    font-size:${autoWidthVW(14)};
  }
`
const SearchView = styled(FlexView)`
  width:100%;
  background: #242837;
  border-radius: ${autoWidthVW(16)};
  padding:${autoWidthVW(20)};
  margin:${autoWidthVW(30)} 0;
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(8)};
    padding:${autoWidthVW(14)};
    margin:${autoWidthVW(25)} 0;
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
const TokenView = styled(FlexViewColumn)`
  background: linear-gradient(0deg, #404866, #404866);
  border-radius: ${autoWidthVW(48)} ${autoWidthVW(48)} 0px 0px;
  padding:${autoWidthVW(36)} ${autoWidthVW(40)};
  width:${autoWidthVW(1440)};
  height:${autoWidthVW(900)};
  @media (max-width: 768px) {
    border-radius: ${autoWidthVW(24)} ${autoWidthVW(24)} 0px 0px;
    padding:${autoWidthVW(18)} ${autoWidthVW(20)};
    width:100%;
    height:${autoWidthVW(500)};
  }
`