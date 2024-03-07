import React from "react";
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import Saleresult from "../saleresult";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";

const SaleModal = (props: any) => {
    const { onClose, modalContext } = props
    const {t}=useTranslationLanguage()
    const handleResult = () => {
        modalContext.show(
            <Saleresult
                type={true}
                onClose={() => {
                    modalContext.hidden()
                }}
            />)
    }

    return <div className={styles.bg}>
        <div className={commonStyle.rowBetween}>
            <span className={styles.title}>{t('Resale details')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.cont}>
            <div className={styles.item}> {t('resold Nft')}：6</div>
            <div className={styles.item}> {t('total resale price')}：284.949 USDT</div>
            <div className={styles.item}> {t('resale handling fee')}：1.5%</div>
            <div className={styles.item}> {t('Total amount payable')}：4.275 USDT </div>
            <div className={styles.item}> {t('Resale opening time')}：2023-10-02 14:00:00</div>

        </div>
        <div className={styles.introduce}>
            <div className={styles.intItem}>{t('Special instructions')}：</div>
            <div className={styles.intItem}>{t('process')}</div>
            <div className={styles.intItem}>{t('directly')}</div>
        </div>
        <div className={styles.cruelsale} onClick={handleResult}>
           {t('Confirm resale')}
        </div>
    </div>
}
export default SaleModal