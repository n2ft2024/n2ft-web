import { ZERO_ADDRESS, formatAccount } from '@/Common';
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import multiavatar from "@multiavatar/multiavatar/esm";
import { useAccount } from 'wagmi';
import ConpyAddress from '@/pages/mysale/ConpyAddress';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { history } from 'umi';
import { useExtremeSwapInfo, useGetInviter, useNFTListInfo, useNFTTodayTotalPrice, useNFTTotalPrice, useNFTYesTodayTotalPrice, useSendTransactionOld, useUserInfo, useUserRewardInfo } from '@/Contract';
import LoadingRow from '@/Components/LoadingRow';
import { useModalContext } from '@/provider/modalProvider';
import Bind from '@/pages/pre-sale/bind';
import { useN2RelationContract } from '@/hooks/useContract';
import { N2Relation_ADDRESSSES } from '@/Contract/addresses';
import dayjs from 'dayjs';
import { useState } from 'react';
import ReverseNFTmodal from '../modal';
import utc from 'dayjs/plugin/utc'
import ClaimUSDTModal from '../modal/claimModal';
dayjs.extend(utc)

const Teams = () => {
  return <div className={commonStyle.mainView}>
    <div className={commonStyle.mainContent}>
      <div className={commonStyle.webView}>
        <TopInfo />
        <div className={styles.line} />
      </div>
      <div className={styles.downView}>
        <RewardInfo />
        <TeamInfo />
      </div>
    </div>
  </div>
}
function RewardInfo() {
  const { t } = useTranslationLanguage()
  const userInfo = useUserInfo()
  const rewardInfo = useUserRewardInfo()
  const { address } = useAccount()

  const NFTTodayTotalPrice = useNFTTodayTotalPrice()
  const NFTYesTodayTotalPrice = useNFTYesTodayTotalPrice()
  const currentTime = dayjs.utc().add(8, 'hour')
  const currentHour = currentTime.hour()
  const currentMinute = currentTime.minute()
  const currentSecond = currentTime.second()

  let startTime = 0
  let endTime = 0
  let isCanPurchase = false
  if (currentHour >= 12 && currentHour <= 24) {
    const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    endTime = (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = true
  }
  if (currentHour < 12) {
    const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    startTime = (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = false
  }

  const time = isCanPurchase ? endTime : startTime

  const [canClick, setCanClick] = useState(isCanPurchase)
  // const [canClick, setCanClick] = useState(true)

  const modalContext = useModalContext()

  const extremeSwapInfo = useExtremeSwapInfo()
  function onMintNFT() {
    if (!canClick) return
    if (extremeSwapInfo.data?.reserveStats) return
    modalContext.show(<ReverseNFTmodal close={modalContext.hidden} onSuccess={() => {
      rewardInfo.refetch()
      extremeSwapInfo.refetch()
    }} />)
  }

  function onClaim() {
    if (!canClick) return
    if (extremeSwapInfo.data?.reserveStats) return
    modalContext.show(<ClaimUSDTModal close={modalContext.hidden} onSuccess={() => {
      rewardInfo.refetch()
      extremeSwapInfo.refetch()
      modalContext.hidden()
    }} onMint={() => {
      modalContext.hidden()
      modalContext.show(<ReverseNFTmodal close={modalContext.hidden} onSuccess={() => {
        rewardInfo.refetch()
        extremeSwapInfo.refetch()
      }} />)
    }} />)
  }

  return <div className={styles.rewardInfo}>
    <div className={commonStyle.webView}>
      <span className={styles.downTitle}>{t('Revenue information')}</span>
    </div>
    <div className={commonStyle.mobileView}>
      <TopInfo />
    </div>
    <div className={styles.downLine} />
    <TotalAssets />
    <div className={styles.downLine} />
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t('Reserve NFTs Today')}:</span>
      {!rewardInfo.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>{rewardInfo.data?.reserveAmount}</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Total amount of NFT reserved today")}:</span>
      {!rewardInfo.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>{rewardInfo.data?.totalGetAPrice} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={styles.downLine} />
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Today’s NFT purchase quantity")}:</span>
      {!NFTTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTTodayTotalPrice.data?.totalAmount}
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Total NFT purchases today")}:</span>
      {!NFTTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTTodayTotalPrice.data?.totalPrice} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Estimated total NFT resale value tomorrow")}:</span>
      {!NFTTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTTodayTotalPrice.data?.totalSellPrice} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Tomorrow NFT is expected to earn from resale")}:</span>
      {!NFTTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTTodayTotalPrice.data?.totalEran} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={styles.downLine} />
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Total NFT purchases yesterday")}:</span>
      {!NFTYesTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTYesTodayTotalPrice.data?.totalPrice} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Today’s NFT resale quantity")}:</span>
      {!NFTYesTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTYesTodayTotalPrice.data?.totalAmount}
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Total NFT resale value today")}:</span>
      {!NFTYesTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTYesTodayTotalPrice.data?.totalSellPrice} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Earn from NFT resale today")}:</span>
      {!NFTYesTodayTotalPrice.data ? <LoadingRow width={20} /> : <span className={styles.downValue}>
        {NFTYesTodayTotalPrice.data?.totalEran} USDT
      </span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={`${styles.downdes} ${styles.downDesDes}`}>{t("Accumulate NFT resale and earn")}:</span>
      <div className={commonStyle.row} style={{ cursor: 'pointer' }} onClick={() => {
        history.push('/extremeSwap/orders?type=sell')
      }}>
        {rewardInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{rewardInfo.data?.income} USDT</span>}
        <img src="/images/right.png" alt="" className={styles.rightImg} />
      </div>
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={styles.downLine} />
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t("balance assets")}:</span>
      {rewardInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{rewardInfo.data?.myPreBalance} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <div onClick={onMintNFT} className={`${commonStyle.rowCenter} ${styles.downButton} ${(!canClick || extremeSwapInfo.data?.reserveStats) && styles.downButtonDis}`}>
        {extremeSwapInfo.data?.reserveStats ? t('Already booked today') : t('Continue Reserve')}
      </div>
      <div onClick={onClaim} className={`${commonStyle.rowCenter} ${styles.downButton} ${(!canClick || extremeSwapInfo.data?.reserveStats) && styles.downButtonDis}`}>
        {t('extract')}
      </div>
    </div>
  </div>
}
function TotalAssets() {
  const { t } = useTranslationLanguage()
  const NFTTotalPrice = useNFTTotalPrice()

  return <div className={commonStyle.rowBetween}>
    <span className={styles.downdes}>{t('Current total assets')}:</span>
    {NFTTotalPrice.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>≈ {NFTTotalPrice.data?.total} USDT</span>}
  </div>
}
function TeamInfo() {
  const { t } = useTranslationLanguage()
  const inviterInfo = useGetInviter()
  const modalContext = useModalContext()
  const userInfo = useUserInfo()
  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  const sendTransaction = useSendTransactionOld()


  const currentTime = dayjs.utc().add(8, 'hour')
  const currentHour = currentTime.hour()
  const currentMinute = currentTime.minute()
  const currentSecond = currentTime.second()

  let startTime = 0
  let endTime = 0
  let isCanPurchase = false
  if (currentHour >= 12 && currentHour <= 24) {
    const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    endTime = (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = true
  }
  if (currentHour < 12) {
    const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
    startTime = (dayjs().unix() + leftSecond) * 1000
    isCanPurchase = false
  }

  const time = isCanPurchase ? endTime : startTime

  const [canClick, setCanClick] = useState(isCanPurchase)
  // const [canClick, setCanClick] = useState(true)


  function onBind() {
    if (inviterInfo.isLoading || inviterInfo.data?.isBind) {
      return
    }
    modalContext.show(<Bind onClose={() => {
      modalContext.hidden()
    }} onBindSuccess={() => {
      modalContext.hidden()
      inviterInfo.refetch()
    }} />)
  }

  function onMore() {
    if (!inviterInfo.data?.isBind) {
      onBind()
      return
    }
    history.push('/extremeswap/teams/detail')
  }
  function onClaimReward() {
    if (!canClick) return
    if (userInfo.data?.claimStats)return
    if (userInfo.isLoading) {
      return
    }
    if (!N2RelationContract) {
      return
    }
    sendTransaction.mutate({
      title: t('extract'),
      func: N2RelationContract.claimTeamReward,
      args: [],
      onSuccess: () => {
        userInfo.refetch()
      },
      onError: () => {
      }
    })

  }

  return <div className={`${styles.rewardInfo} ${styles.teamInfo}`}>
    <div className={commonStyle.rowBetween}>
      <span className={styles.downTitle}>{t('Team information')}</span>
      <div className={styles.row} style={{ cursor: 'pointer' }} onClick={onMore}>
        <span className={styles.downMore}>{t('More information')}</span>
        <img className={styles.downMoreIcon} src='/images/arr_right_color.png' />
      </div>
    </div>
    <div className={styles.downLine} />
    <div className={commonStyle.webView}>
      <div className={commonStyle.rowBetween}>
        <div className={commonStyle.row} style={{ flex: 1 }}>
          <span className={styles.downdes}>{t('My inviter')}:</span>
          <div className={styles.downValueSpace} />
          {inviterInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValueDis}>{inviterInfo.data?.isBind ? formatAccount(inviterInfo.data?.address) : t('None yet')}</span>}
        </div>
        <div onClick={onBind} className={`${commonStyle.rowCenter} ${styles.downButton} ${styles.downButtonSel} ${inviterInfo.data?.isBind && styles.downButtonDis}`}>
          {inviterInfo.isLoading ? <LoadingRow width={20} /> : inviterInfo.data?.isBind ? t('bingdinged') : t('binding')}
        </div>
      </div>
    </div>
    <div className={commonStyle.mobileView}>
      <div className={commonStyle.rowBetween} style={{ alignItems: 'flex-start' }}>
        <span className={styles.downdes}>{t('My inviter')}:</span>
        <div className={commonStyle.column} style={{ alignItems: 'flex-end' }}>
          {inviterInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValueDis}>{inviterInfo.data?.isBind ? formatAccount(inviterInfo.data?.address) : t('None yet')}</span>}
          <div onClick={onBind} className={`${commonStyle.rowCenter} ${styles.downButton} ${styles.downButtonSel} ${inviterInfo.data?.isBind && styles.downButtonDis}`}>
            {inviterInfo.isLoading ? <LoadingRow width={20} /> : inviterInfo.data?.isBind ? t('bingdinged') : t('binding')}
          </div>
        </div>
      </div>
    </div>
    <div className={styles.downLine} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Number of people I recommend')}:</span>
      {inviterInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{inviterInfo.data?.invListLength}</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    {/* <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Team performance')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20}/> : <span className={styles.downValue}>0 USDT</span>}
    </div>
    <div className={styles.downSpaceHeight}/> */}
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Todays team performance')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{userInfo.data?.teamResult} USDT</span>}
    </div>
    <div className={styles.downLine} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Total revenue from team promotion')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{userInfo.data?.teamTotalReward} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Promotion revenue withdrawn')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{userInfo.data?.claimedTeamReward} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Recommendation earnings to be withdrawn')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{userInfo.data?.promoteResult} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowBetween}>
      <span className={styles.downdes}>{t('Promotional income to be withdrawn')}:</span>
      {userInfo.isLoading ? <LoadingRow width={20} /> : <span className={styles.downValue}>{userInfo.data?.viewTeamReward} USDT</span>}
    </div>
    <div className={styles.downSpaceHeight} />
    <div className={commonStyle.rowEnd}>
      <div onClick={onClaimReward}
      className={`${commonStyle.rowCenter} ${styles.downButton} ${!canClick && styles.downButtonDis} ${userInfo.data?.claimStats && styles.downButtonDis}`}>{t('extract')}</div>
    </div>

  </div>
}
function TopInfo() {
  const { t } = useTranslationLanguage()
  const { address } = useAccount()
  const svgCode = multiavatar(String(address || ZERO_ADDRESS))

  const inviterInfo = useGetInviter()
  const modalContext = useModalContext()
  const userInfo = useUserRewardInfo()
  const userInfomation = useUserInfo()

  function onBind() {
    if (inviterInfo.isLoading || inviterInfo.data?.isBind) {
      return
    }
    modalContext.show(<Bind onClose={() => {
      modalContext.hidden()
    }} onBindSuccess={() => {
      modalContext.hidden()
      inviterInfo.refetch()
    }} />)
  }

  function onShare() {
    if (inviterInfo.isLoading || !inviterInfo.data?.isBind) {
      onBind()
      return
    }
    history.push('/Invite')
  }
  return <div className={`${commonStyle.rowBetween}`}>
    <div className={commonStyle.row}>
      <div className={styles.avatar} dangerouslySetInnerHTML={{ __html: svgCode }} />
      <div className={commonStyle.column}>
        <div className={commonStyle.row}>
          {/* <span className={styles.accountID}>ID:-</span> */}
          <div className={commonStyle.mobileView}>
            {userInfomation.isLoading ? <LoadingRow width={20} /> : <span className={styles.level}>{t('Level')}:{userInfomation.data?.vip}</span>}
          </div>
        </div>
        <div className={commonStyle.row}>
          <span className={styles.account}>{formatAccount(address)}</span>
          <ConpyAddress />
        </div>
        <div className={commonStyle.webView}>
          {userInfomation.isLoading ? <LoadingRow width={20} /> : <span className={styles.level}>{t('Level')}:{userInfomation.data?.vip}</span>}
        </div>
      </div>
    </div>
    <img onClick={onShare} className={styles.shareImage} src='/images/share.png' />
  </div>
}
export default Teams