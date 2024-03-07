import React from 'react'
import StatusList from './Status'
import PriceSelect from './PriceSelect'
import CollectionList from './CollectionList'
import styles from './index.module.scss'
interface IProps {
    isShow?: boolean
    hideCollection?: boolean
    setState: any
    state: any
}
const FilterContent = ({ isShow = false, hideCollection, setState, state }: IProps) => {

    const statusList = [
        {
            name: "Show All",
            value: '1'
        },
        {
            name: "Buy Now",
            value: '2'
        }
    ]
    return <div className={styles.filterbox}
        style={{ display: isShow ? 'block' : 'none' }}
    >  {isShow ?
        <div
            style={{
                animation: isShow ? "left_container-width_open 0s forwards" : "left_container-width_close 0s forwards",
            }}
        >
            <StatusList data={statusList} value={state.status}
                onChange={(_val: any) => {
                    setState({ status: _val })

                }}
            />
            <PriceSelect
                data={state.tokenList}
                value={state.priceToken}
                onChange={opt => {
                    setState({ priceMin: opt.min })
                    setState({ priceMax: opt.max })
                    setState({ priceToken: opt.selectValue })
                }} />
            <CollectionList />
        </div> : ''}
    </div>


}
export default FilterContent