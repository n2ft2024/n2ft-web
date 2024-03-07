import React, { useState } from "react";
import styles from './index.module.scss'
import { Collapse, Divider, Radio } from "antd";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import './index.scss'
const StatusList = ({ onChange, data }: any) => {
    const [iconDirection, setIconDirection] = useState<'up' | 'down'>('down');
    const { t } = useTranslationLanguage()
    const ele = (
        <div className={styles.status}>
            <Radio.Group  onChange={onChange}
            >
                {data?.map((item: { value: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => {
                    return <div key={index} className={styles.statusbox}>
                        <Radio value={item.value} key={item.value}/>
                        <div className={styles.statusname}> {item.name}</div>
                    </div>
                })}
            </Radio.Group>
        </div>
    )
    return <div className={styles.statuslist}>
        <Collapse
            expandIcon={() => (iconDirection === 'up' ? <div className={styles.icon}><img src="/images/down.png" alt="" /></div> : <div className={styles.icon}><img src="/images/up.png" alt="" /></div>)}
            expandIconPosition="end"
            items={[{
                label: <div className={styles.statuslebel}>{t('status')}</div>,
                children: ele
            }]}
            ghost={true}
            onChange={(key) => setIconDirection(key.length > 0 ? 'up' : 'down')}
        />
    </div>
}
export default StatusList