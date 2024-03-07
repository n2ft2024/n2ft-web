import React from "react"
import styles from './inde.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage"
import useMedia from "use-media"
const Price = () => {
    const { t } = useTranslationLanguage()
    const isMobile = useMedia({ maxWidth: '768px' })

    const list = [{ price: '10', val: "2", total: '100' }, { price: '38', val: "4", total: '100' }, { price: '50', val: "6", total: '100' }]
    return <div className={styles.price}>
        <div className={styles.price_title}>
            <div className={styles.price_label}>
                {t('price')}  <div className={styles.price_sol}>(USDT) </div>
            </div>
            <div className={styles.price_val}>
                {t('quantity')}
                <div className={styles.price_sol}>（SOL）</div>
            </div>
        </div>
        {
            list?.map((item, index) => {
                return <div className={styles.price_title} key={index}>
                    <div className={styles.price_buylabel} style={{ width: !isMobile ? (Number(item?.price) / Number(item?.total)) * 100 : '' }}>
                        {item?.price}
                    </div>
                    <div className={styles.it_val} style={{ width: isMobile ? (Number(item?.price) / Number(item?.total)) * 100 : '' }}>
                        {item?.val}
                    </div></div>
            })
        }
        <div className={styles.current_price}> 0.523 </div>
        {
            list?.map((item, index) => {
                return <div className={styles.price_sell} key={index}
                >
                    <div className={styles.pricesell_label} style={{ width: !isMobile ?(Number(item?.price) / Number(item?.total)) * 100 :''}}>
                        {item?.price}
                    </div>
                    <div className={styles.it_val_price} style={{ width: isMobile ?(Number(item?.price) / Number(item?.total)) * 100 :''}}>
                        {item?.val}
                    </div></div>
            })
        }
    </div>
}
export default Price