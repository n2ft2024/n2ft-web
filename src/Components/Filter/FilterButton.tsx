import { useFilterIsShow } from "@/Redux/filter";
import React, { useRef } from "react";
import styles from './index.module.scss'
import useClickAway from "@/hooks/useclickAway";
interface IProps {
    onClick: () => void;
    isSticky:boolean;
    onSticky:(value:boolean)=>void
}
const FilterButton = (props: IProps) => {
    const { onClick ,isSticky,onSticky} = props;
    const filterIsShow = useFilterIsShow()
    const filterRef = useRef(null);
    useClickAway(() => {
        onSticky && onSticky(isSticky)
    }, [filterRef])
    return <div onClick={onClick} className={styles.btn} ref={filterRef}>
        {filterIsShow ? <div className={styles.iconImg}>
        <img src="/images/left.png" alt="" />

        </div> : <div className={styles.iconImg}>
        <img src="/images/filter.png" alt="" />
        </div>
        }
    </div>
}
export default FilterButton