import styled, { css, keyframes } from "styled-components";
// https://juejin.cn/post/7037036742985121800
export const ButtonView = styled.div<{
  disable:number
}>`
  background: linear-gradient(180deg, #FAD69F 0%, #C59348 100%);
  flex-direction:row;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:8px;
  padding:10px 20px;
  position:relative;
  opacity: ${({disable})=>disable?'0.5':'1'};
  transform: scale(1);
  cursor:pointer;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
export const LoadingView = styled.div`
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  opacity:0.5;
  background:#fff;
  flex-direction:row;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:no-drop
`
const rotateAnimated = keyframes`
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
`
export const LoadingIcon = styled.img`
  -webkit-transform: rotate(360deg);
  animation: ${rotateAnimated} 1s ease-in-out infinite;
  -moz-animation: ${rotateAnimated} 1s ease-in-out infinite;
  -webkit-animation: ${rotateAnimated} 1s ease-in-out infinite;
  -o-animation: ${rotateAnimated} 1s ease-in-out infinite;
  height:80%
`

const rotateButtonAnimated = keyframes`
  12.5% { scale: 1 }
  25% { scale: 1.1 }
  37.5% { scale: 1 }
  50% { scale: 1.05 }
  62.5% { scale: 1 }
  75% { scale: 1.01 }
  87.5% { scale: 1 }
  100% { scale: 1 }
`
export const ButtonScale = styled(ButtonView)<{
  loading:number
}>`
  opacity:${({loading,disable})=>(loading || disable)?'0.5':'1'};
  cursor:${({loading,disable})=>(loading || disable)?'no-drop':'pointer'};
  animation: ${({loading})=> loading && css`${rotateButtonAnimated} 1s ease-in-out infinite`};
  -moz-animation: ${({loading})=> loading && css`${rotateButtonAnimated} 1s ease-in-out infinite`};
  -webkit-animation: ${({loading})=> loading && css`${rotateButtonAnimated} 1s ease-in-out infinite`};
  -o-animation: ${({loading})=> loading && css`${rotateButtonAnimated} 1s ease-in-out infinite`};
`


const lineButtonAnimated = keyframes`
  0%,
  80%,
  100% {
    height: 20%;
  }
  40% {
    height: 80%;
  }
`
export const ButtonOpacity = styled(ButtonView)<{
  loading:number
}>`
`

export const LoadingViewLine = styled.div`
  animation:${lineButtonAnimated} 1s ease-in-out -0.2s infinite;
  -moz-animation: ${lineButtonAnimated} 1s ease-in-out -0.2s infinite;
  -webkit-animation: ${lineButtonAnimated} 1s ease-in-out -0.2s infinite;
  -o-animation: ${lineButtonAnimated} 1s ease-in-out -0.2s infinite;
  width:10px;
  background:#0f0;
  margin:0 2px
`
export const LoadingViewLineLeft = styled(LoadingViewLine)`
  animation:${lineButtonAnimated} 1s ease-in-out -0.4s infinite;
  -moz-animation: ${lineButtonAnimated} 1s ease-in-out -0.4s infinite;
  -webkit-animation: ${lineButtonAnimated} 1s ease-in-out -0.4s infinite;
  -o-animation: ${lineButtonAnimated} 1s ease-in-out -0.4s infinite;
`
export const LoadingViewLineRight = styled(LoadingViewLine)`
  animation:${lineButtonAnimated} 1s ease-in-out infinite;
  -moz-animation: ${lineButtonAnimated} 1s ease-in-out infinite;
  -webkit-animation: ${lineButtonAnimated} 1s ease-in-out infinite;
  -o-animation: ${lineButtonAnimated} 1s ease-in-out infinite;
`


export const ButtonRotate = styled(ButtonView)<{
  loading:number
}>`
`

const rotateSqButtonAnimated = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const LoadingRotateView = styled.div`
  animation:${rotateSqButtonAnimated} 1s linear infinite;
  -moz-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  -webkit-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  -o-animation: ${rotateSqButtonAnimated} 1s linear infinite;
  /* background:red; */
  width:30px;
  height:30px;
  flex-direction:row;
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap
`

const rotateSqButtonItemAnimated = keyframes`
  0% {
    transform: scale(1);
    opacity:1
  }
  50% {
    transform: scale(0.25);
    opacity:0.5
  }
  100% {
    transform: scale(1);
    opacity:1
  }
`
export const LoadingRotateViewItem1 = styled.div`
  animation:${rotateSqButtonItemAnimated} 1s linear infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear infinite;
  background:blue;
  width:12px;
  height:12px;
  border-radius:50%
`
export const LoadingRotateViewItem2 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -0.5s infinite;
`
export const LoadingRotateViewItem3 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -1s infinite;
`
export const LoadingRotateViewItem4 = styled(LoadingRotateViewItem1)`
  animation:${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -moz-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -webkit-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
  -o-animation: ${rotateSqButtonItemAnimated} 1s linear -1.5s infinite;
`





