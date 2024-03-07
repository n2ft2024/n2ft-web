import React, { useState } from "react";
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import { Checkbox, Table, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { history } from "umi";
import { ColumnsType } from "antd/es/table";
import { useModalContext } from "@/provider/modalProvider";
import SaleModal from "../salemodal";
const Swapmode = () => {
  const {t} = useTranslationLanguage()
    return <div className={styles.swaptitle} >
        <div className={styles.swaipleft}>{t('NFT data statistics')}</div>
        {/* <div className={styles.swaipright} onClick={() => {
            history.push('/extremeswap/orders/statisdetails')
        }}>
            <div className={styles.moremode}> </div>
            <div className={styles.moreIcon}><img src="/images/rightc.png" alt="" /> </div>
        </div> */}
    </div>
}

export default Swapmode