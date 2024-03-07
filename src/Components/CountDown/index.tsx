import styled from "styled-components";
import Countdown, {zeroPad} from "react-countdown";
import dayjs from 'dayjs'
import { useState } from "react";
import { autoWidthVW } from "@/Common";
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export default function CountDownModal({time,title}:{time:string,title?:string}){
  const [isEnd,setIsEnd] = useState(dayjs().isAfter(dayjs(time)))
  if (isEnd){
    return null
  }
  return(
    <Container>
      <CountDownComponent
        time={dayjs(time)}
        title={title}
        onEnd={()=>setIsEnd(true)}
      ></CountDownComponent>
    </Container>
  )
}
function CountDownComponent({time,title,onEnd}:{time:any,title?:string,onEnd?:Function}){

  const defaultComponent = null
  if(!time) return defaultComponent;
  // Renderer callback with condition
  const renderer = ({ days,hours, minutes, seconds, completed }:any) => {
    if (completed) {
      onEnd && onEnd()
      return defaultComponent;
    } else {
      // Render a countdown
      return <CountDownContainer>
        <Title>
            {title}
        </Title>
        <span>{zeroPad(days,2)} {zeroPad(hours,2)}:{zeroPad(minutes,2)}:{zeroPad(seconds,2)}</span>
      </CountDownContainer>;
    }
  };
  return (<Countdown
      date={time}
      renderer={renderer}
  />)
}
const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  //pointer-events: none;
  z-index: 100;
`
const CountDownContainer = styled.div`
  font-size: ${autoWidthVW(50)};
  color: white;
  @media (max-width: 768px) {
    font-size: ${autoWidthVW(30)};
  };
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  font-size: ${autoWidthVW(50)};
  font-weight: bold;
  color: white;
  text-align: center;
  @media (max-width: 768px) {
    font-size: ${autoWidthVW(30)};
  }
`
