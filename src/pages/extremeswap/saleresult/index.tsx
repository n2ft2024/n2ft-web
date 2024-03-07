import React from "react";
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";

const Salesuccess = (props: any) => {
    const { onClose, type } = props;
    const { t } = useTranslationLanguage()
    return <div className={styles.bg}>
        <div className={commonStyle.rowBetween}>
            <span className={styles.title}>{t('resale results')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        {type ? <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('Resale successful')}
            </div>
            <div className={styles.resultdesc}>
                {t('view details')}
            </div>
            <div className={styles.payImg}>
                <img src="/images/salesuccess.png" alt="" />
            </div>
        </div> : <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('Resale failed')}
            </div>
            <div className={styles.resultdesc}>
                {t('view details')}
            </div>
            <div className={styles.payImg}>
                <img src="/images/salesuccess.png" alt="" />
            </div>
        </div>}

        <div onClick={onClose} className={styles.confirm} >
            {t('confirm')}
        </div>
    </div>
}
export default Salesuccess