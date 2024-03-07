import React from "react";
import FilterContent from "./FilterContent";
import { useFilterIsShow } from "@/Redux/filter";
interface IProps {
    hideCollection?: boolean
    setState:any
    state:any
}
function Filter({  hideCollection,setState,state }: IProps) {
    const filterIsShow = useFilterIsShow()
    return  <FilterContent
            hideCollection={hideCollection}
            isShow={filterIsShow}
            setState={setState}
            state={state}/>
}
export default Filter
