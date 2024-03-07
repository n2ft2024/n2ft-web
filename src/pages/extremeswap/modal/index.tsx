import { useModalContext } from '@/provider/modalProvider'
import classNames from 'classnames'
import { useState } from 'react'
import commonStyles from '../../../Common/common.module.scss'
import styles from './index.module.scss'
import ModalResult from './modalResult'
import { useMedia } from 'use-media'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { useCurrentDayID, useExtremeSwapInfo, useMintNFTSellInfo, useMyNFTPointInfo, useNFTTotalPrice, useSendTransactionOld, useUserRewardInfo } from '@/Contract'
import NP from 'number-precision'
import { formatUnits, parseUnits } from 'ethers'
import { useApprove, useWalletInfo } from '@/hooks/useTokenContract'
import { N2SWAP_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses'
import { ApprovalState, formatBalance } from '@/Common'
import { useN2SWAPContract } from '@/hooks/useContract'
import { useLoadingContext } from '@/provider/loadingProvider'
import { Slider, message } from 'antd'
import { isUndefined, isNaN } from 'lodash'
import LoadingRow from '@/Components/LoadingRow'
import { SliderMarks } from 'antd/es/slider'
import { UPDATE_REALTIME_BALANCE_URL, postRequest } from '@/API'
import { useAccount } from 'wagmi'

NP.enableBoundaryChecking(false)

type modalProps = {
  close: any,
  onSuccess: any
}
export default function ReverseNFTmodal({ close, onSuccess }: modalProps) {
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
  const [checkPointPay, setCheckPointPay] = useState(false)
  const mintNFTSellInfo = useMintNFTSellInfo()
  const NFTTotalPrice = useNFTTotalPrice()
  const myNFTPointInfo = useMyNFTPointInfo()
  const walletInfo = useWalletInfo()
  const currentDayID = useCurrentDayID()
  const {address} = useAccount()
  let payUSDT = 0
  let payFee = 0
  if (getTotalPay(num, extremeSwapInfo.data?.getAPrice) >= Number(extremeSwapInfo.data?.myPreBalance)) {
    payUSDT = Number(getPay(num, extremeSwapInfo.data?.getAPrice, extremeSwapInfo.data?.balance))
    payFee = Number(mintNFTSellInfo.data?.fee)
  } else {
    payFee = Number(mintNFTSellInfo.data?.fee)
  }


  const [approveStatus, approve] = useApprove(USDT_ADDRESSSES, N2SWAP_ADDRESSSES,
    payUSDT + payFee
  )


  function getTitle() {
    if (extremeSwapInfo.data?.reserveStats) {
      return {
        title: t('Already booked today'),
        able: false
      }
    }
    if (num == '') {
      return {
        title: t('enter quantity'),
        able: false
      }
    }
    if (getTotalPay(num, extremeSwapInfo.data?.getAPrice) >= Number(extremeSwapInfo.data?.myPreBalance)) {
      if (Number(getPay(num, extremeSwapInfo.data?.getAPrice, extremeSwapInfo.data?.balance)) + Number(checkPointPay ? 0 : payFee) > Number(walletInfo.data?.USDT)) {
        return {
          title: t('Insufficient wallet balance'),
          able: false
        }
      }
    }
    if (checkPointPay){
      if (Number(mintNFTSellInfo.data?.payPoints) > Number(myNFTPointInfo.data?.myPoints)){
        return {
          title: t('Not enough points'),
          able: false
        }
      }
    }

    if (approveStatus != ApprovalState.APPROVED) {
      return {
        title: t('approve') + ' USDT',
        able: true
      }
    }
    return {
      title: t('pay immediately'),
      able: true
    }
  }

  function onPay() {
    if (!getTitle().able){
      return
    }
    if (approveStatus != ApprovalState.APPROVED) {
      approve && approve()
      return
    }
    if (num == '') {
      return
    }
    if (extremeSwapInfo.isLoading) {
      return
    }

    if (!N2SWAPContract) return
    if (extremeSwapInfo.data?.reserveStats) {
      return
    }
    sendTransaction.mutate({
      title: 'Swap',
      func: N2SWAPContract.reserve,
      args: [num, checkPointPay],
      onSuccess: () => {
        loadingContext.hide()
        onSuccess && onSuccess()
        modal.show(<ModalResult res="success" close={close} />)

        const params = {
          "dayID" :currentDayID.data?.dayID,
          "address":address,
          "amount":parseUnits(getTotalPay(num, extremeSwapInfo.data?.getAPrice) + '') + ''
        }
        postRequest(UPDATE_REALTIME_BALANCE_URL,params)

      },
      onError: (err: any) => {
        alert(JSON.stringify(err))
      }
    })
  }
  function onClaim() {

  }
  const marks: SliderMarks = {
    1: '1',
    25: '25',
    50: '50',
    75: "75",
    100: '100'
  };
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalTitle}>
          <span className={styles.titleName}>{t('Pre-order NFT')}</span>
        <img src="/images/close.png" alt="" onClick={close} />
      </div>
      <div
        className={classNames(
          commonStyles.mobileView,
          styles.divideLine
        )}></div>
      <div className={styles.orderNum}>
        <h3>{t('reservation')}</h3>
        <div className={styles['input-wrap']}>
          <input
            value={num}
            disabled={extremeSwapInfo.data?.reserveStats}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!isNaN(parseInt(e.target.value)) && !isUndefined(parseInt(e.target.value))) {
                setNum(parseInt(e.target.value) + '')
              } else {
                setNum('')
              }
            }
            }
          // placeholder=''
          />

          <img
            src="/images/clear.png"
            alt=""
            className={styles.clearIcon}
            style={{ opacity: num !== '' && num !== '0' ? 1 : 0 }}
            onClick={() => setNum('0')}
          />
        </div>
        <div className={styles.markes}>
          <Slider marks={marks} defaultValue={1} value={Number(num)} onChange={(e: any) => {
            if (extremeSwapInfo.data?.reserveStats) return
            setNum(e)
          }} />

        </div>
        {/* <div className={styles.range}>
          <div className={styles['track-wrap']} style={{ right: step }}>
            <div className={styles.track}>
              <div className={styles.bg}></div>
              <div className={styles.handle}></div>
            </div>
          </div>
          <div className={styles['range-words']}>
            <div
              onClick={() => {
                if (extremeSwapInfo.data?.reserveStats) return
                !isMobile && setStep('94%')
                isMobile && setStep('93%')
                setNum('1')
              }}>
              <span style={{ marginLeft: 10 }}>1</span>
            </div>
            <div
              onClick={() => {
                if (extremeSwapInfo.data?.reserveStats) return
                setStep('72%')
                setNum('10')
              }}>
              <span>10</span>
            </div>
            <div
              onClick={() => {
                if (extremeSwapInfo.data?.reserveStats) return
                setStep('47%')
                setNum('20')
              }}>
              <span>20</span>
            </div>
            <div
              onClick={() => {
                if (extremeSwapInfo.data?.reserveStats) return
                setStep('22%')
                setNum('50')
              }}>
              <span>50</span>
            </div>
            <div
              onClick={() => {
                if (extremeSwapInfo.data?.reserveStats) return
                setStep('0%')
                setNum('100')
              }}>
              100
            </div>
          </div>
        </div> */}
        <div className={styles.desc}>
          <h3>{t('Pre-order details')}</h3>
          <div className={styles.descInfo}>
            <div className={`${commonStyles.rowBetween}`}>
              <span className={styles.titledes}>
                {t('Pre-order NFT quantity')}：{num !== '' ? num : 0}
              </span>
              <span className={`${styles.titledes} ${styles.hight}`}>
                {t('Pre-order payment')}:{getTotalPay(num, extremeSwapInfo.data?.getAPrice)}
              </span>
            </div>
            <div className={`${commonStyles.row} ${styles.titledesSpa}`}>
              <div className={`${styles.titledes}`}>{t('Average unit')}:</div>
              {!extremeSwapInfo.data?.getAPrice ? <LoadingRow width={20} /> : <div className={`${styles.titledes}`}>{formatUnits(extremeSwapInfo.data?.getAPrice || 0)} USDT</div>}
            </div>
            <div className={`${commonStyles.rowBetween} ${styles.titledesSpa}`}>
              {getTotalPay(num, extremeSwapInfo.data?.getAPrice) >=Number(extremeSwapInfo.data?.myPreBalance) ? <div className={`${commonStyles.row}`}>
                <span className={styles.titledes}>{t('Amount payable')}:</span>
                {extremeSwapInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>{getPay(num, extremeSwapInfo.data?.getAPrice, extremeSwapInfo.data?.balance)} USDT</span>}
              </div> : <div className={commonStyles.row}>
                <span className={`${styles.titledes} ${styles.hight}` }>{t('Amount available')}: </span>
                {extremeSwapInfo.isLoading ? <LoadingRow width={20} /> : <span className={`${styles.titledes}  ${styles.hight}`}> {extremeSwapInfo.data?.reserveStats ? 0 : Number(extremeSwapInfo.data?.myPreBalance || 0) -  getTotalPay(num, extremeSwapInfo.data?.getAPrice)} USDT</span>}
              </div>}
              <span className={styles.titledes}>
                {t('My ExtremeSwap Balance')}:{extremeSwapInfo.data?.myPreBalance}
              </span>
            </div>
            {/* <div className={styles.row}>{t('Appointment time')}：0</div> */}
          </div>
        </div>

        <div className={`${styles.desc} ${styles.titledesSpa}`}>
          <h3>{t('Resale details')}</h3>
          <div className={styles.descInfo}>
            <div className={`${commonStyles.rowBetween}`}>
              <div className={commonStyles.row}>
                <span className={styles.titledes}>
                  {t('Number of resold NFTs')}:
                </span>
                {mintNFTSellInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>
                  {mintNFTSellInfo.data?.amount}
                </span>}
              </div>
              <div className={commonStyles.row}>
                <span className={styles.titledes}>
                  {t('total resale price')}:
                </span>
                {mintNFTSellInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>
                  {mintNFTSellInfo.data?.fee}
                </span>}
              </div>
            </div>
            <div className={`${commonStyles.row} ${styles.titledesSpa}`}>
              <span className={styles.titledes}>
                {t('Estimated resale revenue')}:
              </span>
              {NFTTotalPrice.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>
                {NFTTotalPrice.data?.totalNFTPrice}
              </span>}
            </div>
            <div className={`${commonStyles.row} ${styles.titledesSpa}`}>

              <div className={commonStyles.row}>
                <img className={styles.checkIcon} src={checkPointPay ? '/images/checkbox_s.png' : '/images/checkbox-n.png'} onClick={() => {
                  setCheckPointPay(!checkPointPay)
                }} />
                <div className={styles.swapTitle}>{t('Points payment')} {t('98 discount')}</div>
              </div>
            </div>
            <div className={`${commonStyles.rowBetween} ${styles.titledesSpa}`}>
              <div className={`${commonStyles.row}`}>
                <span className={styles.titledes}>{t('My scores')}:</span>
                {myNFTPointInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>{formatBalance(myNFTPointInfo.data?.myPoints || 0)}</span>}
              </div>
              <div className={commonStyles.row}>
                <span className={styles.titledes}>{t('Amount of points to be paid')}:</span>
                {mintNFTSellInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>{checkPointPay ? formatBalance(mintNFTSellInfo.data?.payPoints || 0) : 0}</span>}
                {/* {mintNFTSellInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.titledes}>{checkPointPay ?  mintNFTSellInfo.data?.payPoints   : 0}</span>} */}
                </div>
            </div>
          </div>
        </div>
        {getTotalPay(num, extremeSwapInfo.data?.getAPrice) >= Number(extremeSwapInfo.data?.myPreBalance) ? <div
          className={styles.purchseBtn}
          style={{ background: !getTitle().able ? '#FFDCC3' : (canPurchase ? '#EF8339 ' : '#FFDCC3') }}
          onClick={onPay}>
          {getTitle().title}
        </div> : <div
          className={styles.purchseBtn}
          style={{
            background: extremeSwapInfo.data?.reserveStats ? '#FFDCC3' : (num == '' ? '#FFDCC3' : (checkPointPay && Number(mintNFTSellInfo.data?.payPoints) > Number(myNFTPointInfo.data?.myPoints)) ? '#FFDCC3' : (canPurchase ? '#EF8339 ' : '#FFDCC3'))
          }}
          onClick={onPay}>
          {approveStatus != ApprovalState.APPROVED ? t('approve') + ' USDT' :
          ((checkPointPay && Number(mintNFTSellInfo.data?.payPoints) > Number(myNFTPointInfo.data?.myPoints)) ? t('Not enough points') : t('appointment'))
          }
        </div>}
        {getTotalPay(num, extremeSwapInfo.data?.getAPrice) < Number(extremeSwapInfo.data?.myPreBalance) && <span className={styles.tip}>
          *{t('After receiving USDT')}
        </span>}
      </div>
    </div>
  )
}
function getTotalPay(num: string, getAPrice: bigint | undefined) {
  if (!getAPrice) {
    return 0
  }
  return Number(formatUnits(BigInt(num) * (getAPrice || BigInt(0))))
}

function getPay(num: string, getAPrice: bigint | undefined, balance: bigint | undefined) {
  if (!getAPrice) {
    return 0
  }
  if (BigInt(num) * (getAPrice || BigInt(0)) < (balance || BigInt(0))) {
    return 0
  }
  return formatBalance(formatUnits(BigInt(num) * (getAPrice || BigInt(0)) - (balance || BigInt(0))))
}
