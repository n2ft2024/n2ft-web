import { ZERO_ADDRESS, formatAccount } from '@/Common';
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import multiavatar from "@multiavatar/multiavatar/esm";
import { useAccount } from 'wagmi';
import ConpyAddress from '@/pages/mysale/ConpyAddress';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useState } from 'react';
import NotData from '@/Components/NotData';
import { useGetInviter, useTeamUserInfo } from '@/Contract';
import LoadingRow from '@/Components/LoadingRow';


const TeamsDetail=()=>{
  const {t} = useTranslationLanguage()
  const inviterInfo = useGetInviter()

  return <div className={commonStyle.mainView}>
    <div className={commonStyle.mainContent}>
      <div className={styles.main} style={{minHeight:window.innerHeight - 500}}>
        <div className={`${commonStyle.rowBetween} ${styles.topView}`}>
          <span className={styles.topTitle}>{t('user')}</span>
          <span className={styles.topTitle} style={{textAlign:'center'}}>{t('status')}</span>
          <span className={styles.topTitle} style={{textAlign:'center'}}>{t('Level')}</span>
          <span className={styles.topTitle} style={{textAlign:'center'}}>{t("Today's performance")}</span>
          <span className={styles.topTitle} style={{textAlign:'right'}}>{t('team reward')}</span>
        </div>
        {
          inviterInfo.isLoading ? <LoadingRow width={40}/> : (inviterInfo.data?.invList.length == 0 ? <NotData/> : inviterInfo.data?.invList.map((item:any,index:number)=>{
            return <ItemIinfo key={index+'teamdetail'} address={String(item)}/>
          }))
        }
      </div>
    </div>
  </div>
}

function ItemIinfo({address}:any){
  const teamUserInfo = useTeamUserInfo(address)
  const {t} = useTranslationLanguage()
  return <div className={`${commonStyle.rowBetween} ${styles.itemView}`}>
  <span className={styles.downTitle}>{formatAccount(address)}</span>
  <span className={styles.downTitle}>{teamUserInfo.data?.reserveStats ? t("Already reserved") : t("No reservation")}</span>
  <span className={styles.downTitle} style={{textAlign:'center'}}>VIP {teamUserInfo.data?.mLv}</span>
  <span className={styles.downTitle} style={{textAlign:'center'}}>{teamUserInfo.data?.personReward} USDT</span>
  <span className={styles.downTitle} style={{textAlign:'right'}}>{teamUserInfo.data?.teamResult} USDT</span>
</div>
}

export default TeamsDetail