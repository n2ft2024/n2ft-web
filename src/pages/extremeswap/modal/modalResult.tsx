import classNames from 'classnames'
import commonStyles from '../../../Common/common.module.scss'
import styles from './modalResult.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
interface ModalProps {
  res: string
  close: any
}

export default function ModalResult({ res, close }: ModalProps) {
  const flag = res === 'success'
  console.log('res flag', flag)
  const { t } = useTranslationLanguage()
  return (
    <div className={styles.resultModal}>
      <div className={styles.titleRow}>
        <h3>{t('payment result')}</h3>
        <img
          src="/images/close.png"
          alt=""
          className={styles.cancelBtn}
          onClick={close}
        />
      </div>
      <div
        className={classNames(
          commonStyles.mobileView,
          styles.divideLine
        )}></div>
      <div className={styles.resWrap}>
        <div className={styles.result}>
          <div className={classNames(styles.words, flag ? null : styles.fail)}>
            {flag ? t('payment successful') : t('Payment failed')}
          </div>
          <div className={styles.tip}>
            {flag ? t('check details') : t('check network')}
          </div>
          <img
            src={flag ? '/images/res_success.png' : '/images/res_fail.png'}
            alt=""
          />
        </div>
        <div className={styles.okBtn} onClick={close}>
          {t('OK')}
        </div>
      </div>
    </div>
  )
}
