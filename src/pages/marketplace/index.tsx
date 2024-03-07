import React, { useState } from "react";
import styles from './index.module.scss'
import MarketSwiper from './swiper/Swiper'
import MarketItem from './market/index'
import FilterButton from "@/Components/Filter/FilterButton";
import { useDispatch } from "react-redux";
import { changeFilterbtn, useFilterIsShow } from "@/Redux/filter";
import SearchInput from "@/Components/SearchInput";
import ControlledList from "@/Components/ControlledList";
const MarketPlace = () => {
    const dispatch = useDispatch()
    const filterIsShow = useFilterIsShow()
    const [isSticky, setIsSticky] = useState(false)
    const [list, setList] = useState<any>([])
    const [total, setTotal] = useState(0)
    const setHeaderStyle = (_isSticky: boolean) => {
        setIsSticky(_isSticky)
    }
    return <div className={styles.marketplace}>
        <MarketSwiper />
        {/* <ControlledList
            // request={}
            showSearch={true}
            hideCollection={true}
            requestData={(_data, total) => {
                setList(_data)
                setTotal(total)
            }}
        >
            {[...new Array(7)]?.map((item:any, index:any) => {
                return <MarketItem data={item} key={index} />
            })
            }
        </ControlledList> */}
        {/* <div className={styles.marketbox}>
            {[...new Array(125)].map((item, index) => {
                return <div key={index}>
                    <MarketItem data={item} key={index} />
                </div>
            })}
        </div> */}
    </div>
}
export default MarketPlace