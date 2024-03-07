import React from 'react'
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import Tranding from './Trading'
import RightBut from './RightBut'
import useMedia from 'use-media'
import Tab from './Trading/Tab'
import RoundChart from './Trading/Chart'
import Stock from './Trading/stock'
const PointsTrading = () => {
    const isMobile = useMedia({ maxWidth: '768px' })
    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            <div className={styles.pointsTrading}>
                {/* <Tranding /> */}
                <RightBut />
                {/* {isMobile && <Tab />} */}
            </div>

        </div>
    </div>
}
export default PointsTrading