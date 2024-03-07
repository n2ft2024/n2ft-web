import React from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const PaymentResult = ({ onClose, type }: any) => {
    const { t } = useTranslationLanguage()
    return <div className={styles.bg}>
        <div className={styles.rowBetween}>
            <span className={styles.title}>{t('paymentResult')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        {type ? <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('paymentSuccess')}
            </div>
            <div className={styles.resultdesc}>
                {t('checkDetailsInMyPresale')}
            </div>
            <div className={styles.payImg}>
                <img src="/images/paymentSuccess.png" alt="" />
            </div>
        </div> : <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('paymentFailed')}
            </div>
            <div className={styles.resultdesc}>
                {t('pleaseCheckNetworkAndRetry')}
            </div>
            <div className={styles.payImg}>
                <img src="/images/paymentfiled.png" alt="" />
            </div>
        </div>
        }
        <div onClick={onClose} className={styles.confirm} >
            {t('confirm')}
        </div>
    </div>
}
export default PaymentResult