import { ThreeCircles } from 'react-loader-spinner'

export default function LoadingText({width = 30}:{width?:number}){
  return <ThreeCircles
    height={width}
    width={width}
    color="#d8d8d8"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />
}