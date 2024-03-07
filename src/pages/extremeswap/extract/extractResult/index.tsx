import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import React from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
const ExtractResult = (props: any) => {
    const { onClose, type } = props;
    const { t } = useTranslationLanguage()
    return <div className={styles.bg}>
        <div className={commonStyle.rowBetween}>
            <span className={styles.title}>{t('Extract results')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        {type ? <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('Extraction successful')}

            </div>
            <div className={styles.resultdesc}>
                {t('view details')}
            </div>
            <div className={styles.payImg}>
                <img src="/images/extractresult.png" alt="" />
            </div>
        </div> : <div className={styles.cont}>
            <div className={styles.resulttitle}>
                {t('Extraction failed')}
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
export default ExtractResult