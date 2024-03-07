import React from "react";
import { styled } from "umi";
import styles from './style.module.scss'
import Tab from "./Tab";
import useMedia from "use-media";
import Stocks from "./stock";
const Trading = () => {
    const isMobile = useMedia({ maxWidth: '768px' })
    const type = 1
    return <div className={styles.tranding}>
        <>
            <div className={styles.stockmob}>
                <div className={styles.current_price}>
                    0.1213
                </div>
                <div className={styles.float}>
                    {type > 2 ? <div className={styles.buylabel}>
                        +12
                    </div> : <div className={styles.selllabel}>
                        -33
                    </div>}
                </div>
            </div>
            <Stocks />
        </>
        {!isMobile && <Tab />}

    </div>
}
export default Trading
