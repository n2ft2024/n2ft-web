import React, { useState } from 'react'
import styles from './index.module.scss'
import commonStyles from '@/Common/common.module.scss'
import { history, useLocation } from 'umi'
import TradingNoda from './tradingNodata'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import useMedia from 'use-media'
import { Drawer, Modal } from 'antd'
import BuySale from '../buysale'
import { useMyNFTInfo, useMyNFTPointInfo, useSendTransactionOld } from '@/Contract'
import { useApprove } from '@/hooks/useTokenContract'
import { N2NPOOL_ADDRESSSES, N2Relation_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses'
import { ApprovalState } from '@/Common'
import { useN2NPOOLContract, useN2RelationContract } from '@/hooks/useContract'
import { isMobile } from 'react-device-detect'
import { useAccount } from 'wagmi'
import { useModalContext } from '@/provider/modalProvider'
import Pointsgift from './ Pointsgift'
import dayjs from 'dayjs'
const Memberbenefits = (props: any) => {
    const { type, onClose, setMembership, Membership } = props
    const location = useLocation()
    const nodata={
        type:0
    }
    const params: any = location?.state||nodata
    return <div className={styles.memberbenefits}>
        {(isMobile ? params?.type : type) == 0 ? <TradingNoda onClose={onClose} setMembership={setMembership} Membership={Membership} /> :
            <PointItem type={isMobile ? params?.type - 1 : type - 1} onClose={onClose} setMembership={setMembership} Membership={Membership} />}
    </div>
}
export default Memberbenefits
interface PointItemProps {
    type: any;
    onClose: Function;
    Membership: boolean;
    setMembership: Function
}
const PointItem = (props: PointItemProps) => {
    const { type, onClose, Membership, setMembership } = props;
    const { t } = useTranslationLanguage()
    const isMobile = useMedia({ maxWidth: '768px' })
    const myNFTInfo = useMyNFTInfo()
    const myNFTPointInfo = useMyNFTPointInfo()
    const modalContext = useModalContext()
    const list = [
        {
            img: '/images/silverMember.png',
            bg: "url(/images/silver_bg.png)",
            topname: 'url(/images/silver_title.png)',
            topmedal: '/images/silver_medal.png',
            name: t('silver medal'),
            key: "SilverMember",
            title: t('Silver membership'),
            price: 50
        },
        {
            img: '/images/goldMember.png',
            bg: "url(/images/gold_bg.png)",
            topname: 'url(/images/gold_title.png)',
            topmedal: '/images/gold_medal.png',
            name: t('gold medal'),
            title: t('Gold membership'),
            key: "GoldMember",
            price: 200
        },
        {
            img: '/images/platuimMember.png',
            bg: "url(/images/platiNnum_bg.png)",
            topname: 'url(/images/platinum_title.png)',
            topmedal: '/images/platinum_medal.png',
            name: t('platinum'),
            title: t('Platinum Member'),
            key: "PlatuimMember",
            price: 1000

        }, {
            img: '/images/supremeMember.png',
            bg: "url(/images/supreme_bg.png)",
            topname: 'url(/images/supreme_title.png)',
            topmedal: '/images/supreme_medal.png',
            name: t('supreme'),
            title: t('Supreme Member'),
            key: "ExtremeMember",
            price: 10000

        }
    ]

    const [approveStatus, approve] = useApprove(USDT_ADDRESSSES, N2Relation_ADDRESSSES, myNFTInfo.data?.upgradePrice)
    const sendTransaction = useSendTransactionOld()
    const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)

    function onUpgrade() {
        if (approveStatus != ApprovalState.APPROVED) {
            // onClose && onClose()
            approve && approve()
            return
        }
        if (!N2RelationContract) {
            return
        }
        sendTransaction.mutate({
            title: 'Upgrade',
            func: N2RelationContract.updateM,
            args: [],
            onSuccess: () => {
                myNFTInfo.refetch()
            }
        })
    }
    function onClaim() {
        if (!N2RelationContract) {
            return
        }
        sendTransaction.mutate({
            title: 'claimUSDT',
            func: N2RelationContract?.claimUSDT,
            args: [],
            onSuccess: () => {
                myNFTInfo.refetch()
            }
        })
    }
    const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)
    const { address } = useAccount()
    function onClaimPointer() {
        if (!N2NPOOLContract) {
            return
        }
        sendTransaction.mutate({
            title: 'claimedReward',
            func: N2NPOOLContract?.claim,
            args: [],
            onSuccess: () => {
                myNFTPointInfo.refetch()
            }
        })
    }

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
    return <>
        <div className={styles.top}
            style={{ backgroundImage: list[type]?.bg }}>
            <div className={styles.topname}
                style={{ background: list[type]?.topname }} >
                {list[type]?.title}
            </div>
            <div className={styles.menmer_box}>
                <div>
                    <div className={styles.menmer_name}>
                        {t('Member Points')}
                    </div>
                    <div className={styles.menmer_value}>
                        {list[type]?.price}
                    </div>
                    <div className={styles.menmertext}>
                        <div className={styles.medalIcon}>
                            <img src="/images/fill-medal.png" alt="" />
                        </div>
                        <div className={styles.medaltext}>
                            {t('value')} {list[type]?.price} USDT
                        </div>
                    </div>
                </div>
                <div className={styles.topmedal}>
                    <img src={list[type]?.topmedal} alt="" />
                </div>
            </div>



        </div>
        <div className={styles.cont}>
            <div className={commonStyles.rowBetween}>
                <div className={styles.cont_title}>
                    {t('My membership card')}
                </div>
                {myNFTInfo.data?.mLv != 4 && <div className={commonStyles.row}>
                    <div className={styles.lv_title} onClick={onUpgrade}>
                        {t('cost')} {myNFTInfo.data?.upgradePrice} U{t('upgrade')}
                    </div>
                    <div className={styles.right}>
                        <img src="/images/arror_r_c.png" alt="" />
                    </div>
                </div>}
            </div>
            <div className={styles.cont_item}>
                <div className={styles.cont_info}>
                    <div className={styles.cont_Img}>
                        <img src={list[type]?.img} alt="" />
                    </div>
                    <div className={styles.cont_right}>
                        <div className={styles.contright_title}>
                            {list[type]?.title}
                        </div>
                        <div className={styles.saleprice}>
                            <div className={styles.pricelabel}>
                                {t('selling price')}
                            </div>
                            <div className={styles.pricevalue}>
                                {list[type]?.price} USDT
                            </div>
                        </div>
                        {/* <div className={styles.timer}>
                            <div className={styles.timerlabel}>
                                {t('Purchase time')}
                            </div>
                            <div className={styles.timervalue}>
                                2023-10-02 19:34:22
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.detail}>
            <div className={styles.detail_title}>{t('memeber reward')}</div>
            {/* <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('Total need to collect')} ：</div>
                <div className={styles.detail_val}>78</div>
            </div> */}
            <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('Received')}: </div>
                <div className={styles.detail_val}>{myNFTInfo.data?.USDTRewardClaimed} USDT</div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('To be collected')}: </div>
                <div className={commonStyles.row}>
                    <div className={styles.detail_val}>{myNFTInfo.data?.usdtReward} USDT</div>
                    <div className={`${commonStyles.rowCenter} ${styles.claimButton}`} onClick={onClaim}>
                        {t('receive')}
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.detail}>
            <div className={styles.detail_title}>{t('points reward')}</div>
            {/* <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('Total need to collect')} ：</div>
                <div className={styles.detail_val}>78</div>
            </div> */}
            <div className={styles.detail_info}>
                <div className={styles.detail_label}>{t('total points reward')}: </div>
                <div className={styles.detail_val}>{myNFTPointInfo.data?.totalReward}</div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('Received')}: </div>
                <div className={styles.detail_val}>{myNFTPointInfo.data?.claimedReward}</div>
            </div>
            <div className={styles.detail_info}>
                <div className={styles.detail_label}> {t('To be collected')}: </div>
                <div className={commonStyles.row}>
                    <div className={styles.detail_val}>{myNFTPointInfo.data?.earned}</div>
                    <div className={`${commonStyles.rowCenter} ${styles.claimButton}`} onClick={onClaimPointer}>
                        {t('receive')}
                    </div>
                </div>
            </div>
        </div>


        <div className={styles.relBtn}>
            {/* <div className={styles.points}>
                {t('Receive points')}
            </div> */}
            <div className={styles.trading} onClick={() => {
                // onClose()
                // history.push('/PointsTrading')
                if (isMobile) {
                    history.push('/PointsTrading')
                } else {
                    onClose()
                    history.push('/PointsTrading')
                    // setTimeout(() => {
                    //     setMembership(true)
                    // }, 300)
                }
            }}>
                {t('Points trading')}
            </div>
            {!isCanPurchase? <div className={styles.tradingTrans} >
                {t('Points gift')}
            </div>: <div className={styles.trading} onClick={() => {
                modalContext.show(
                    <Pointsgift
                        onClose={() => {
                            modalContext.hidden()
                        }}
                        modalContext={modalContext} />
                )
            }}>
                {t('Points gift')}

            </div>

            }
            {/* <div className={`${styles.trading} ${!isCanPurchase && styles.tradingTrans}`} onClick={() => {
                modalContext.show(
                    <Pointsgift
                        onClose={() => {
                            modalContext.hidden()
                        }}
                        modalContext={modalContext} />
                )
            }}>
                {t('Points gift')}

            </div> */}
        </div>

    </>
}
