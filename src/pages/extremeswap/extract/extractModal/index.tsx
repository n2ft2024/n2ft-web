import React from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import ExtractResult from "../extractResult";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const ExtractModal = (props: { onClose: any; modalContext: any; onSuccess: any }) => {
    const { onClose, modalContext } = props;
    const {t}=useTranslationLanguage()
    const handleResult=()=>{
        modalContext.show(
            <ExtractResult
                type={true}
                onClose={() => {
                    modalContext.hidden()
                }}
            />)
    }
    return <div className={styles.bg}>
        <div className={commonStyle.rowBetween}>
            <span className={styles.title}> {t('Resale details')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.cont}>
            <div className={styles.item}> {t('Withdraw NFT quantity')}：86 </div>
            <div className={styles.item}> {t('Extraction time')}：2023-10-02 14:00:00</div>
        </div>
        <div className={styles.introduce}>
            <div className={styles.intItem}>{t('Special instructions')}：</div>
            <div className={styles.intItem}>{t('withdrawing')}</div>
            <div className={styles.intItem}> {t('extracted')}</div>
        </div>
        <div className={styles.cruelsale} onClick={handleResult}>
     {t('cruel extraction')}
        </div>
    </div>
}
export default ExtractModal