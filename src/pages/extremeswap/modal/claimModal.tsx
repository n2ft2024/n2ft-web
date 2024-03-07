import { useModalContext } from '@/provider/modalProvider'
import classNames from 'classnames'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import commonStyles from '../../../Common/common.module.scss'
import styles from './index.module.scss'
import ModalResult from './modalResult'
import { useMedia } from 'use-media'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { useExtremeSwapInfo, useMintNFTSellInfo, useMyNFTPointInfo, useNFTTotalPrice, useSendTransactionOld, useUserRewardInfo } from '@/Contract'
import NP from 'number-precision'
import { formatUnits } from 'ethers'
import { useApprove } from '@/hooks/useTokenContract'
import { N2SWAP_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses'
import { ApprovalState, formatBalance } from '@/Common'
import { useN2SWAPContract } from '@/hooks/useContract'
import { useLoadingContext } from '@/provider/loadingProvider'
import { Slider, message } from 'antd'
import { isUndefined, isNaN } from 'lodash'
import LoadingRow from '@/Components/LoadingRow'
import { SliderMarks } from 'antd/es/slider'

export default function ClaimUSDTModal({ close,onSuccess, onMint }: any) {
  const [num, setNum] = useState('1')
  const [step, setStep] = useState('94%')
  const [canPurchase, setCanPurchase] = useState(true)
  const modal = useModalContext()
  const isMobile = useMedia({ maxWidth: '768px' })
  const { t } = useTranslationLanguage()
  const extremeSwapInfo = useExtremeSwapInfo()

  const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
  const sendTransaction = useSendTransactionOld()
  const loadingContext = useLoadingContext()
  function onClaim() {
    if (!N2SWAPContract) return
    sendTransaction.mutate({
      title: 'Claim',
      func: N2SWAPContract.reserve,
      args: [0, false],
      onSuccess: () => {
        loadingContext.hide()
        onSuccess && onSuccess()
      }
    })
  }

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalTitle}>
        <span className={styles.titleName}>{t('extract')}</span>
        <img src="/images/close.png" alt="" onClick={close} />
      </div>
      <span className={styles.tip}>{t('claim tips')}</span>
      <div className={commonStyles.rowBetween}>
      <div
        className={styles.mintButton}
        onClick={onMint}>
        {t('Continue Reserve')}
        </div>
        <div
        className={`${styles.mintButton} ${styles.claimButton}`}
        onClick={onClaim}>
        {t('extract')}
        </div>
      </div>
    </div>
  )
}