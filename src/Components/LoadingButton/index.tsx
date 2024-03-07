import {
  ButtonView,
  LoadingView,
  LoadingIcon,
  ButtonScale,
  ButtonOpacity,
  LoadingViewLine,
  LoadingViewLineLeft,
  LoadingViewLineRight,
  ButtonRotate,
  LoadingRotateView,
  LoadingRotateViewItem1,
  LoadingRotateViewItem2,
  LoadingRotateViewItem3,
  LoadingRotateViewItem4
} from "./styles";
import React from 'react'

interface buttonType{
  children:React.ReactNode,
  loading?:boolean,
  disable?:boolean,
  style?:Object,
  onClick?:any
}

export default function LoadingButton({
  children,
  loading=false,
  disable=false,
  style,
  onClick,
}:buttonType){
  return <ButtonView style={style} disable={Number(disable)} onClick={()=>{
    if (!loading && !disable){
      onClick && onClick()
    }
  }}>
    {children}
    {loading && <LoadingView>
      <LoadingIcon src={'./images/loadingIcon.png'}/>
    </LoadingView>}
  </ButtonView>
}
export function LoadingButtonScale({
  children,
  loading=false,
  disable=false,
  style,
  onClick,
}:buttonType){
  return <ButtonScale loading={loading?1:0} style={style} disable={Number(disable)} onClick={()=>{
    if (!loading && !disable){
      onClick && onClick()
    }
  }}>
    {children}
  </ButtonScale>
}

export function LoadingButtonOpacity({
  children,
  loading=false,
  disable=false,
  style,
  onClick,
}:buttonType){
  return <ButtonOpacity loading={loading?1:0} style={style} disable={Number(disable)} onClick={()=>{
    if (!loading && !disable){
      onClick && onClick()
    }
  }}>
    {children}
    {loading && <LoadingView>
      <LoadingViewLineLeft/>
      <LoadingViewLine/>
      <LoadingViewLineRight/>
    </LoadingView>}
  </ButtonOpacity>
}

export function LoadingButtonRotate({
  children,
  loading=false,
  disable=false,
  style,
  onClick,
}:buttonType){
  return <ButtonRotate loading={loading?1:0} style={style} disable={Number(disable)} onClick={()=>{
    if (!loading && !disable){
      onClick && onClick()
    }
  }}>
    {children}
    {loading && <LoadingView>
        <LoadingRotateView>
        <LoadingRotateViewItem1/>
        <LoadingRotateViewItem2/>
        <LoadingRotateViewItem3/>
        <LoadingRotateViewItem4/>
      </LoadingRotateView>
    </LoadingView>}
  </ButtonRotate>
}