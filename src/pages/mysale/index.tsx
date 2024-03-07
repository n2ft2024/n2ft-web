import React, { useState } from "react";
import styles from './index.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { formatAccount } from "@/Common";
import copy from "copy-to-clipboard";
import { useAccount } from "wagmi";
import multiavatar from "@multiavatar/multiavatar/esm";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useMyNFTInfo, useSendTransactionOld } from "@/Contract";
import LoadingRow from "@/Components/LoadingRow";
import { Spin } from "antd";
import { useN2RelationContract } from "@/hooks/useContract";
import { N2Relation_ADDRESSSES } from "@/Contract/addresses";
import ConpyAddress from "./ConpyAddress";
const MySale = () => {
  const { address } = useAccount()
  const addressString: any = address?.toString()
  const svgCode = multiavatar(addressString)
  const { t } = useTranslationLanguage()
  const myNFTInfo = useMyNFTInfo()
  const list = [
    {
      title: t('silverMember'),
      img: '/images/silverMember.png',
      presaleprice: "35",
      originalprice: '50',
      value: '50',
      id: 2
    },
    {
      title: t('goldMember'),
      img: '/images/goldMember.png',
      presaleprice: "140",
      originalprice: '200',
      value: '200',
      id: 1
    },
    {
      title: t('platinumMember'),
      img: '/images/platuimMember.png',
      presaleprice: "700",
      originalprice: '1000',
      value: '700',
      id: 0
    },
  ]


  const Item = (props: any) => {
    const { item, index } = props;
    return <div key={index} className={styles.nftItem}>
      <div className={styles.nftImg}>
        <img src={item?.img} alt="" />
      </div>
      <div className={styles.Itemcon}>
        <div className={styles.nfttitle}>
          {item.title}
        </div>
        <div className={styles.line} />
        <div className={styles.integral}>
          {!myNFTInfo.data ? <LoadingRow width={20} /> : <div className={styles.integralvalue}>
            {t('reward')} {item?.value}U
          </div>}
        </div>
      </div>
    </div>
  }
  return <div className={commonStyles.mainView}>
    <div className={commonStyles.mainContent}>
      <div className={styles.Inforcont}>
        <div className={styles.InforImg} dangerouslySetInnerHTML={{ __html: svgCode }}>
        </div>
        <div className={commonStyles.column} style={{ alignItems: 'flex-start' }}>
          <div className={styles.InforBox}>
            <div className={styles.Infoaddress}>
              {formatAccount(address)}
            </div>
            <ConpyAddress />
          </div>
          <RewardInfo address={address} myNFTInfo={myNFTInfo} />
        </div>
      </div>
      <div className={styles.nftcont}>
        {
          list.map((item, index) => {
            return <Item item={item} index={index} />
          })
        }
      </div>

    </div>
  </div>
}
function RewardInfo({ address, myNFTInfo }: any) {
  const { t } = useTranslationLanguage()
  const [loading, setLoading] = useState(false)
  const sendTransaction = useSendTransactionOld()
  const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
  function onClaim() {
    if (loading || !N2RelationContract || myNFTInfo.isLoading) {
      return
    }
    if (Number(myNFTInfo.data?.usdtReward) == 0) {
      return
    }
    setLoading(true)
    sendTransaction.mutate({
      title: t('receive'),
      func: N2RelationContract.claimUSDT,
      args: [address],
      onSuccess: () => {
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }
  return <div className={commonStyles.row}>
    <div className={commonStyles.column}>
      <span className={styles.Infoaddress} style={{ color: '#90949A' }}>{t('Promotional income')}</span>
      <span className={styles.Infoaddress} style={{ color: '#90949A' }}>{t('Income to be collected')}</span>
    </div>
    <div className={commonStyles.column}>
      {myNFTInfo.isLoading ? <LoadingRow width={30} /> : <span className={styles.Infoaddress}>{myNFTInfo.data?.getTotalUSDTReward}</span>}
      <div className={commonStyles.row}>
        {myNFTInfo.isLoading ? <LoadingRow width={30} /> : <span className={styles.Infoaddress}>{myNFTInfo.data?.usdtReward}</span>}
        <Spin spinning={loading}>
          <div onClick={onClaim} className={`${commonStyles.rowCenter} ${styles.claimButtton}`}>{t('receive')}</div>
        </Spin>
      </div>
    </div>
  </div>
}
export default MySale