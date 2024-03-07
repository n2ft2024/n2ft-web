import { ZERO_ADDRESS, formatAccount } from '@/Common';
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import multiavatar from "@multiavatar/multiavatar/esm";
import { useAccount } from 'wagmi';
import ConpyAddress from '@/pages/mysale/ConpyAddress';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useState } from 'react';
import NotData from '@/Components/NotData';
import { useSearchParams } from 'umi';
import copy from "copy-to-clipboard";
import { useGetInviter, useSendTransactionOld } from '@/Contract';
import LoadingRow from '@/Components/LoadingRow';
import { useN2RelationContract } from '@/hooks/useContract';
import { N2Relation_ADDRESSSES } from '@/Contract/addresses';
import { useLoadingContext } from '@/provider/loadingProvider';
import { LoadingButtonRotate } from '@/Components/LoadingButton';
import { useModalContext } from '@/provider/modalProvider';
import Bind from '@/pages/pre-sale/bind';


const Invite=()=>{
  const [searchParams, setSearchParams]  = useSearchParams()
  const inviteInfo = useGetInviter()
  const {t} = useTranslationLanguage()
  return <div className={commonStyle.mainView}>
    <div className={commonStyle.mainContent}>
      <div className={`${commonStyle.rowCenter} ${styles.main}`}>
        <div className={`${commonStyle.column} ${styles.rowCent1}`}>
          <span className={styles.title1}>{t('Invite Friends To Join')}</span>
          <span className={`${styles.title1} ${styles.title2}`}>ExtremeSwap</span>
          <img className={styles.leftImg} src='/images/bindimg.png'/>
        </div>
        <div className={styles.righrSpa}/>
        {inviteInfo.isLoading ? <LoadingRow width={200}/> : (inviteInfo.data?.isBind ? <InviteInfo/> : <BindInfo code={searchParams.get('inviteCode')}/>)}
      </div>
    </div>
  </div>
}
function InviteInfo(){
  const {t} = useTranslationLanguage()

  return <div className={`${commonStyle.column} ${styles.rowCent}`}>
    <span className={styles.title3}>{t('My invite link')}</span>
    <LinkInfo/>
    <span className={`${styles.title3} ${styles.codeSpa}`}>{t('My invite code')}</span>
    <AddressInfo/>
  </div>
}
function BindInfo({code}:{code:string | null}){
  const n2relationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  const sendTransaction = useSendTransactionOld()
  const loadingContext = useLoadingContext()
  const [loading,setLoading] = useState(false)
  const { t } = useTranslationLanguage()
  const inviteInfo = useGetInviter()
  const modalContext = useModalContext()

  function onBind(){
    if (!code){
      modalContext.show(<Bind onClose={() => {
        modalContext.hidden()
      }} onBindSuccess={() => {
        modalContext.hidden()
        inviteInfo.refetch()
      }} />)
      return
    }

    if (!n2relationContract || loading){
      return
    }
    setLoading(true)
    sendTransaction.mutate({
      title:t('binding'),
      func:n2relationContract.bind,
      args:[code],
      onSuccess:()=>{
        loadingContext.hide()
        setLoading(false)
        inviteInfo.refetch()
      },
      onError:()=>{
        setLoading(false)
      }
    })
  }
  return <div className={`${commonStyle.column} ${styles.rowCent}`}>
    <span className={styles.title3}>{t('My invite person')}</span>
    <div className={styles.bgInput}>
      <span className={`${styles.codeTitle} ${styles.tailText}`} style={{width:'100%'}}>{code || t('None yet')}</span>
    </div>
    <div className={styles.buttonView}>
      <div onClick={onBind} className={`${commonStyle.rowCenter} ${styles.button}`}>{t('bind now')}</div>
    </div>
  </div>
}
function AddressInfo(){
  const {address} = useAccount()
  const [copySuccess,setCopySuccess] = useState(false)
  const {t} = useTranslationLanguage()

  function onCopyAddress(){
    if (address){
      copy(address)
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000);
    }
  }
  return <div className={commonStyle.column}>
    <div className={styles.bgInput}>
      <span className={`${styles.title3} ${styles.tailText}`}>{address}</span>
      <img onClick={onCopyAddress} className={styles.copy} src='/images/copy_dark.png'/>
    </div>
    <span className={styles.tips}>{copySuccess ? t('invite code copy success') : ''}</span>
  </div>
}
function LinkInfo(){
  const {t} = useTranslationLanguage()

  const [copySuccess,setCopySuccess] = useState(false)
  const {address} = useAccount()
  const linkURL = window.location.origin + '/Invite?inviteCode=' + address
  function onCopyLink(){
    if (address){
      copy(linkURL)
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000);
    }
  }
  return <div className={`${commonStyle.column} ${styles.rowCent}`}>
    <div className={styles.bgInput}>
      <span className={`${styles.title3} ${styles.tailText}`}>{linkURL}</span>
      <img onClick={onCopyLink} className={styles.copy} src='/images/copy_dark.png'/>
    </div>
    <span className={styles.tips}>{copySuccess ? t('invite link copy success') : ''}</span>
  </div>
}

export default Invite