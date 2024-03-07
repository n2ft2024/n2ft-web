import React from "react";
import styles from './inde.module.scss'
import Top from "./Top";
import Price from "./Price";
const RightBut = () => {
    return <div className={styles.rightBut}>
        <Top />
        {/* <Price /> */}
    </div>
}
export default RightBut