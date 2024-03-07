import React from "react";
import commonStyle from '@/Common/common.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import styles from './style.module.scss'

const Transactionhistory = (props: any) => {
    const { onClose } = props;
    const { t } = useTranslationLanguage()
    const type = 1
    return <div className={styles.detailModal}>
        <div className={`${commonStyle.rowBetween} ${styles.transaction_title}`}>
            <span className={styles.title}>{t('Transaction details')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.mobiletranstion_title}>{t('Transaction details')}</div>
        <div className={styles.cont}>
            <div className={styles.cont_title}>
                {type === 1 ? <span className={styles.cont_title_buy}>{t('goBuy')}</span> :
                    <span className={styles.cont_title_sell}>{t('sell')}</span>

                }
                <span className={styles.cont_usdt}>
                    {t('USDT')}
                </span>

            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('order number')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('Commission price')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('deal price')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('Total amount of commissions')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('Commission time')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_info_label}>
                    {t('Update time')}
                </div>
                <div className={styles.detail_info_val}>
                    12
                </div>
            </div>
        </div>
    </div>
}
export default Transactionhistory
