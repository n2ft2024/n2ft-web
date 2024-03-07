import { ApprovalState } from '@/Common'
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import LoadingRow from '@/Components/LoadingRow'
import { useLaunchpadMintAmount, useSendTransactionOld } from '@/Contract'
import { GMINT_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses'
import { useGMINTContract } from '@/hooks/useContract'
import { useApprove, useWalletInfo } from '@/hooks/useTokenContract'
import { useEffect, useState } from 'react'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { message } from 'antd'
import dayjs from 'dayjs'
import CountDown from '@/pages/extremeswap/CountDown'
import { SpaceHeight } from '@/Components/View'
import { useLoadingContext } from '@/provider/loadingProvider'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function Mint() {
  const price = 100
  const free = 1.5
  const [quaniyt, setQuanity] = useState(1)
  const [checked, setChecked] = useState(true)
  const { t } = useTranslationLanguage()
  const launchpadMintAmount = useLaunchpadMintAmount()


  const currentTime = dayjs.utc().add(8,'hour')
  const currentHour = currentTime.hour()
  const currentMinute = currentTime.minute()
  const currentSecond = currentTime.second()

  let startTime = 0
  let endTime = 0
  let isCanPurchase = false
  if (currentHour >= 12 && currentHour <=24 ){
    const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    endTime = (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = true
  }
  if (currentHour < 12){
    const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    startTime =  (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = false
  }

  const [canMint, setCanMint] = useState(isCanPurchase)
  // const [canMint, setCanMint] = useState(true)

  console.log('canMint===',canMint)

  useEffect(()=>{
    if (launchpadMintAmount.data?.mintdayID){
      if (launchpadMintAmount.data?.mintdayID >= 28){
        setCanMint(false)
      }
    }
  },[launchpadMintAmount.data])

  function decreaseQuanity() {
    if (quaniyt <= 1) {
      return
    }
    setQuanity((pre: number) => pre - 1)
  }
  function increaseQuaniyt() {
    if (!launchpadMintAmount.data) {
      return
    }
    if (quaniyt >= launchpadMintAmount.data.leftAmount) {
      return
    }
    setQuanity((pre: number) => pre + 1)
  }
  function onQuanityChange(e: any) {
    if (!launchpadMintAmount.data) {
      return
    }
    if (!Number(e.target.value)) {
      setQuanity(1)
    } else {
      if (Number(e.target.value) > launchpadMintAmount.data.leftAmount) {
        setQuanity(launchpadMintAmount.data.leftAmount)
      } else {
        setQuanity(Number(e.target.value))
      }
    }
  }
  const loadingContext = useLoadingContext()
  const walletInfo = useWalletInfo()
  const sendTransaction = useSendTransactionOld()
  const GMINTContract = useGMINTContract(GMINT_ADDRESSSES)
  const [approveStatus, approve] = useApprove(USDT_ADDRESSSES, GMINT_ADDRESSSES, price * quaniyt + (checked ? quaniyt * free : 0))
  function onConfirm() {

    if (launchpadMintAmount.isLoading) { return }
    if (!GMINTContract) { return }
    if ((launchpadMintAmount.data?.mintdayID || 0) >= 28){
      message.warning(t('The event is over'))
      return
    }
    if (launchpadMintAmount.data?.mintStats) {
      message.warning(t('Already mint today!'))
      return
    }
    if ((launchpadMintAmount.data?.leftAmount || 0) <= 0) {
      message.warning(t('All mint completed today!'))
      return
    }
    if(Number(walletInfo.data.USDT) < (checked ? price + free : price)){
      message.warning(t('Insufficientbalance'))
      return
    }
    if (approveStatus != ApprovalState.APPROVED) {
      approve()
      return
    }

    sendTransaction.mutate({
      title: 'Mint',
      func: GMINTContract.Mint,
      args: [1, checked ? 1 : 0],
      onSuccess: () => {
        launchpadMintAmount.refetch()
        loadingContext.hide()
      }
    })
  }
  return (
    <div>
      <div className={styles.mintArea}>
        <div className={styles.mintTitle}></div>
        <div className={commonStyle.row}>
          <div className={styles.priceLable}>{t('price')}:</div>
          <img src="/tokens/USDT.png" alt="" className={styles.ethersIcon} />
          <div className={styles.price}>{price}</div>
        </div>
        <div className={styles.line}></div>

        <div className={styles.quanitySelect}>
          {/* <div className={commonStyle.row}>
            <div className={styles.operation} onClick={decreaseQuanity}>
              <img className={styles.icon_sub} src='/images/icon_sub.png' />
            </div>
            <input className={styles.box} value={quaniyt} onChange={onQuanityChange} />
            <div className={styles.operation} onClick={increaseQuaniyt}>
              <img className={styles.icon_add} src='/images/icon_add.png' />
            </div>
            {launchpadMintAmount.isLoading ? <LoadingRow width={20}/> : <div className={styles.max}>Max {launchpadMintAmount.data?.leftAmount}</div>}
          </div> */}
        </div>
        <div className={commonStyle.rowBetween}>
          <div className={commonStyle.row}>
            <img className={styles.checkIcon} src={checked ? '/images/checkbox_s.png' : '/images/checkbox-n.png'} onClick={() => {
              setChecked(!checked)
            }} />
            <div className={styles.swapTitle}>{t('casting')}</div>
          </div>
          <div className={styles.priceTotal}>
            <span className={styles.totalLabel}>{t('Total price')}:</span>
            <img src="/tokens/USDT.png" alt="" className={styles.ethersIcon} />
            <span className={styles.tPrice}>
              ${price * quaniyt + (checked ? quaniyt * free : 0)}
            </span>
            {/* <span className={styles.sum}>$1632.7</span> */}
          </div>
        </div>
      </div>


      {!canMint && (
        <>
          <SpaceHeight height={10}/>
          <CountDown
            // setPurchase={setCanPurchase}
            date={startTime}
            canPurchase={canMint}
            changePurchase={() => setCanMint(true)}
          />
        </>
      )}


      {canMint && launchpadMintAmount.data && <div className={styles.selectBtns}>
        <div className={`${styles.slectBtn} ${styles.confirm} ${(launchpadMintAmount.data?.mintdayID >= 28 || launchpadMintAmount.data?.mintStats || launchpadMintAmount.data?.leftAmount <= 0) &&  styles.dis}`} onClick={onConfirm}>
          {
            launchpadMintAmount.data?.mintdayID >= 28 ? t('The event is over') : (launchpadMintAmount.data?.mintStats ? t('Already mint today!') :
            (launchpadMintAmount.data?.leftAmount <= 0 ? t('All mint completed today!') : (approveStatus != ApprovalState.APPROVED ? t('approve') + ' USDT' :t('confirm'))))
          }
        </div>
        {/* <div className={`${styles.slectBtn} ${styles.slect}`}>Select NFTs to Buy</div> */}
      </div>}

    </div>
  )
}
