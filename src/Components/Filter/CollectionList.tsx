import React, { useState } from "react";
import styles from './index.module.scss'
import { Collapse, Input } from "antd";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";

const CollectionList = () => {
    const [iconDirection, setIconDirection] = useState<'up' | 'down'>('down');
    const { t } = useTranslationLanguage()

    const ele = (
        <div>
            <div className={styles.collectseach}>
                <Input placeholder="Search" className={styles.collectinput} />
                <div className={styles.search}><img src="/images/search.png" alt="" /></div>
            </div>
            <div className={styles.collectbox}>
                {[...new Array(5)].map((item, index) => {
                    return <div key={index} className={styles.collecItem}>
                        <div className={styles.collectImg}>
                            <img src="/images/avatar.png" alt="" />
                        </div>
                        <div className={styles.collectText}>
                            <div className={styles.collectName}>
                                1231231212312312123123121231231212312312123123121231231212312312
                            </div>
                            <div className={styles.collectcont}>
                                <div className={styles.cont_left}>fool</div>
                                <div className={styles.cont_right}>
                                    <div className={styles.con_img}>
                                        <img src="/images/chain.png" alt="" />
                                    </div>
                                    <div className={styles.con_text}>
                                        0.009
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>


    )
    return <div className={styles.collect}>
        <Collapse
            expandIcon={() => (iconDirection === 'up' ? <div className={styles.icon}><img src="/images/down.png" alt="" /></div> : <div className={styles.icon}><img src="/images/up.png" alt="" /></div>)}
            expandIconPosition="end"
            items={[{
                label: <div className={styles.statuslebel}>{t('collections')}</div>,
                children: ele
            }]}
            ghost={true}
            onChange={(key) => setIconDirection(key.length > 0 ? 'up' : 'down')}
        />
    </div>
}
export default CollectionList