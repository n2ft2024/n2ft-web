import { FlexViewCenter } from "../View";
import { Triangle } from 'react-loader-spinner'

export default function LoadingRow({width = 100}:{width?:number | string}){
  return <Triangle
  height={width}
  width={width}
  color="#EF8339"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  visible={true}
/>
}