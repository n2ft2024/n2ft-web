import React from "react";
import styles from './style.module.scss'
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Historical from "./Historical";
import Current from "./Current";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import RoundChart from "./Chart";
const Tab = (props: any) => {
    const {t}=useTranslationLanguage()
    return <div className={styles.tabbox}>
        <Tabs >
            {/*  */}
            <TabPane tab={t('Current order')} key="1">
              <Current />
            </TabPane>
            {/* Historical transactions */}
            <TabPane tab={t('Historical transactions')} key="2">
        <Historical />
            </TabPane>
        </Tabs>
    </div>
}
export default Tab