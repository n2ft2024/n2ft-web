import React, { useEffect, useRef } from 'react'
import { useSetState } from 'ahooks'
import useDomScroll from "@/hooks/useDomScroll"
import styles from './index.module.scss'
interface Result {
    list: any[]
    total_count: number
}
interface IScrollProps {
    children: any
    request: any
    page?: number
    pageSize?: number
    target?: any
    threshold?: number
    onChange: (data: any[], total: number) => void
    onRef?: (ref: any) => void
    noData?: any
}
const defaultResult = {
    list: [],
    total_count: 0,
}

function InfiniteScroll({
    children,
    request,
    page = 1,
    pageSize = 20,
    target,
    onChange,
    threshold,
    onRef,
    noData,
}: IScrollProps) {
    const refScroll = useRef<any>(null)
    const scroll = useDomScroll(target?.current || 'window')
    const [{ _page, _pageSize, requestFlag, allData, total, reloadLoading, showNoData }, setState] = useSetState({
        _page: page,
        _pageSize: pageSize,
        data: [],
        total: 0,
        requestFlag: true,
        allData: [],
        reloadLoading: true,
        showNoData: false,
    } as any)

    useEffect(() => {
        getLoadMoreList()
    }, [])

    useEffect(() => {
        if (requestFlag && scroll?.scrollBottom && scroll.scrollBottom < (threshold || document.body.scrollHeight / 2.5)) {
            if (allData.length >= total) return
            getLoadMoreList()
        }
    }, [scroll])

    const _reload = (params: any) => {
        setState({ _page: 1 })
        setTimeout(() => reload(params, showNoData, _page))
    }

    useEffect(() => {
        refScroll.current = { reload: _reload }
        onRef && onRef(refScroll)
    }, [showNoData])

    async function _request(): Promise<Result> {
        return defaultResult
    }

    const reload = async (params: any, _isr: any, page: number) => {
        page = 1
        if (!_isr) return
        setState({ reloadLoading: true, requestFlag: false })
        try {
            const result = await request(1, _pageSize, params)
            const list = result.list || []
            onChange && onChange(list, result.total_count)
            setState({
                _page: page + 1,
                total: result.total_count,
                allData: list,
                showNoData: true,
                reloadLoading: false,
                requestFlag: true,
            })
        } catch (error) {
            setState({
                reloadLoading: false,
                requestFlag: true,
                showNoData: true,
            })
        }
    }

    async function getLoadMoreList() {
        setState({ requestFlag: false })
        const fetchFunction = request || _request
        try {
            const result = await fetchFunction(_page, _pageSize)
            const list = result.list || []
            onChange && onChange([...allData, ...list], result.total_count)
            setState({
                _page: _page + 1,
                total: result.total_count,
                requestFlag: true,
                allData: [...allData, ...list],
                showNoData: true,
                reloadLoading: false,
            })
        } catch (err) {
            setState({ showNoData: true, reloadLoading: false })
            console.log(err)
        }
    }

    function renderList() {
        if (reloadLoading) {
            return (
                <div className={styles.loading}>
                    loading
                </div>
            )
        }
        // else if (showNoData && !allData.length) {
        //     return noData
        // }
        return children
    }

    function renderLoadMore() {
        return (
            <div className={styles.loadmore}>
                <div className={styles.loadbox}>
                    {!!allData.length && allData.length >= total ? (
                        <div className={styles.footer}>
                        </div>
                    ) : (
                        <div>
                            loading
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <>
            {renderList()}
             {!reloadLoading && !!allData.length && renderLoadMore()}
        </>
    )
}
export default InfiniteScroll
