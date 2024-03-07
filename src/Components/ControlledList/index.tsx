import React, { FC, useEffect, useState } from "react";
import FilterButton from "../Filter/FilterButton";
import SearchInput from "../SearchInput";
import { useDispatch } from "react-redux";
import { changeFilterbtn, useFilterIsShow } from "@/Redux/filter";
import _, { values } from 'lodash'
import SortSelect from "../Filter/FilterSort";
import Filter from "../Filter";
import { useSetState, useUpdateEffect } from "ahooks";
import styles from './index.module.scss'
import InfiniteScroll from "../Insrcoll";
import { changeshowbtn } from "@/Redux/showmuch";
import { Table } from "antd";

export interface IFilterState {
    tokenList: { label: string; value: string }[],
    status: string,
    priceToken: any
    priceMin?: number | undefined
    priceMax?: number | undefined
    keyword: string
    sortType: string
    data: any[]

}
interface IControlledListProps {
    request?: (params: any, options?: any) => Promise<any>
    requestData?: (data: any, total: any) => void
    showSearch?: boolean
    hideCollection?: boolean
    children: any
}
const ControlledList: FC<IControlledListProps> = ({ children, request, requestData, showSearch, hideCollection }) => {
    const [state, setState] = useSetState<IFilterState>({
        status: '1',
        tokenList: [],
        priceToken: "",
        priceMin: undefined,
        priceMax: undefined,
        keyword: '',
        sortType: '',
        data: [],
    })
    console.log(children,'children')
    const [showMuch, setShowMuch] = useState(true)
    const dispatch = useDispatch()
    const filterIsShow = useFilterIsShow()
    const [isSticky, setIsSticky] = useState(false)
    const setHeaderStyle = (_isSticky: boolean) => {
        setIsSticky(_isSticky)
    }
    const [scrollRef, setScrollRef] = useState<any>()
    useUpdateEffect(() => {
        scrollRef?.current?.reload({ ...state })
    }, [state])
    useEffect(() => {
        dispatch(changeshowbtn(showMuch))
    }, [showMuch])
    const getList = async (pageNumber: any, pageSize: any, _values: any) => {
    }
    return <>
        <div className={styles.contracttop}>
            <FilterButton
                isSticky={isSticky}
                onSticky={_isSticky => {
                    setHeaderStyle(_isSticky)
                }}
                onClick={() => {
                    dispatch(changeFilterbtn(!filterIsShow))
                }} />
            <SearchInput onChange={_.debounce(function (value: any) {
                setState({ keyword: value })
            }, 300)} />
            <SortSelect
                onChange={(e: any) => {
                    setState({ sortType: e })
                }} />
            <div className={styles.check}>
                <div className={styles.checkIcon}
                    aria-disabled={showMuch}
                    onClick={() => {
                        setShowMuch(true)
                    }}>
                    {showMuch ? <img src="/images/tablecheck.png" alt="" /> : <img src="/images/table.png" alt="" />
                    }

                </div>
                <div className={styles.checkborder}></div>
                <div className={styles.checkIcon}
                    onClick={() => {
                        setShowMuch(false)
                    }}>
                    {showMuch ? <img src="/images/tabcart.png" alt="" /> : <img src="/images/tabcartcheck.png" alt="" />
                    }
                </div>
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <Filter hideCollection={hideCollection}
                setState={setState} state={state} />
            {(
                <InfiniteScroll
                    onRef={_ref => setScrollRef(_ref)}
                    request={getList}
                    onChange={(data: any, total) => {
                        setState({ data })
                        requestData && requestData(data, total)
                    }}
                >
                    <div className={styles.cont}>
                        <div className={styles.total}>
                            <span className={styles.totalValue}>1540609</span>
                            <span className={styles.totalabel}>NFTs</span>
                        </div>
                        {showMuch ? <div className={styles.grild}>
                            {children}
                        </div> : <div className={styles.contab}>
                            <Table />
                        </div>}
                    </div>
                </InfiniteScroll>
            )}
        </div>

    </>
}
export default ControlledList