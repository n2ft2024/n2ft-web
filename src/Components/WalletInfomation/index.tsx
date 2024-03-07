import React, { useEffect, useState } from "react";
import styles from './index.module.scss'
import { history } from 'umi'
import { useDisconnect } from "wagmi";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { Drawer, message } from "antd";
import Memberbenefits from "../../pages/Memberbenefits";
import useMedia from "use-media";
import { useMyNFTInfo, useMyNFTPointInfo } from "@/Contract";
import { useWalletInfo } from "@/hooks/useTokenContract";
import { COUNTDOWN_TIME, formatBalance } from "@/Common";
import { isMobile } from "react-device-detect";
import CountDownModal from "../CountDown";
import LoadingRow from "../LoadingRow";
interface WalletInfomationProps {
    setMember: Function;
    Menmber: boolean;
    onClose: Function

}
const WalletInfomation = (props: any) => {
    const { onClose, Menmber, setMember, setMembership, Membership } = props;
    const { t } = useTranslationLanguage()
    const { disconnect } = useDisconnect()
    const myNFTInfo = useMyNFTInfo()
    const myNFTPointInfo = useMyNFTPointInfo()
    const walletInfo = useWalletInfo()
    // useEffect(() => {
    //     if (Menmber && isMobile) {
    //         setMember(false)
    //         history.push('/memberbenefits')
    //     } 
    // }, [Menmber,isMobile])
    const disSetMember = () => {
        if (isMobile) {
            setMember(false)
        } else {
            setMember(false)
        }
    }
    return <div className={styles.wallet}>
        <div className={styles.walletInfomation}>
            {/* <div className={styles.walletleft}> */}
            {/* <div className={styles.walletItem} onClick={() => {
                    onClose()
                    history.push('/mynft')
                }}>
                    <div className={styles.icon}>
                        <img src="/images/package.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('mynfts')}</div>
                </div> */}
            {/* <div className={styles.walletItem} onClick={() => {
                    onClose()
                    setTimeout(() => {
                        if (isMobile) {
                            history.push('/memberbenefits')
                        } else {
                            setMember(true)
                        }
                    }, 500);
                }}>
                    <div className={styles.icon}>
                        <img src="/images/package.png" alt="" />
                    </div>
                    <div className={styles.walletname}>
                        {t('member benefits')}
                    </div>
                </div> */}
            {/* <div className={styles.walletItem} onClick={()=>{
                    message.warning('coming soon~')
                }}>
                    <div className={styles.icon}>
                        <img src="/images/coins.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('ListingNFTs')}</div>

                </div>
                <div className={styles.walletItem} onClick={()=>{
                    message.warning('coming soon~')
                }}>
                    <div className={styles.icon}>
                        <img src="/images/layers.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('mycollection')}</div>

                </div>
                <div className={styles.walletItem} onClick={()=>{
                    message.warning('coming soon~')
                }}>
                    <div className={styles.icon}>
                        <img src="/images/star.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('mycollect')}</div>

                </div> */}
            {/* <div className={styles.walletItem}

                    onClick={() => {
                        onClose()
                        history.push('/Invitation')
                    }}
                >
                    <div className={styles.icon}>
                        <img src="/images/frame.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('myinvitation')}</div>

                </div> */}

            {/* </div> */}

            <div className={styles.walletright}>
                {/* <div className={styles.walletItem}
                    // onClick={() => {
                    //     onchange()
                    //     history.push('/edit')
                    // }}
                    onClick={()=>{
                        message.warning('coming soon~')
                    }}
                    >
                    <div className={styles.icon}>
                        <img src="/images/edit.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('personalinformation')}</div>

                </div>
                <div className={styles.walletItem} onClick={()=>{
                    message.warning('coming soon~')
                }}>
                    <div className={styles.icon}>
                        <img src="/images/tag.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('NFTQuote')}</div>

                </div>
                <div className={styles.walletItem}
                onClick={()=>{
                    message.warning('coming soon~')
                }}
                //  onClick={() => {
                //     onchange()
                //     history.push('/Invitation')
                // }}
                >
                    <div className={styles.icon}>
                        <img src="/images/frame.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('myinvitation')}</div>

                </div> */}

                <div className={styles.walletItem} onClick={() => {
                    onClose()
                    disconnect()
                }}>
                    <div className={styles.icon}>
                        <img src="/images/log.png" alt="" />
                    </div>
                    <div className={styles.walletname}>{t('logout')}</div>
                </div>
            </div>
        </div>

        <div className={styles.balance}>
            <div className={styles.balancetitle}>
                <div className={styles.balancename}>
                    {t('accountBalance')}
                </div>
                {/* <div className={styles.balancevalue}>
                    -
                </div> */}
            </div>
            <div className={styles.balanceItem}>
                <div className={styles.balanceItemleft}>
                    <div className={styles.balanceImg}>
                        <img src="/images/t.png" alt="" />
                    </div>
                    <div className={styles.balanceItemtext}>
                        <div className={styles.balanceItemtitle}>
                            USDT
                        </div>
                        <div className={styles.balanceItembot}>
                            Balance:{formatBalance(walletInfo.data?.USDT)}
                        </div>
                    </div>
                </div>
                {/* <div className={styles.balanceItemright}>
                    3.46
                </div> */}
            </div>
        </div>
        <div className={styles.award}>
            <div className={styles.awardtitle}>
                <div className={styles.awardname}>
                    {t('myreward')}
                </div>
                <div className={styles.awardbox}>
                    <div className={styles.awardlist}>
                        {myNFTInfo.data?.USDTRewardClaimed}
                    </div>
                    {/* <div className={styles.right}>
                        <img src="/images/right.png" alt="" />
                    </div> */}
                </div>

            </div>

        </div>

        <div className={styles.awardbox}>
            <div className={styles.awardname}>
                {t('member benefits')}
            </div>
            <div className={styles.memberright} onClick={() => {
                if (myNFTInfo.isLoading)return
                onClose()
                if (isMobile) {
                    history.push('/memberbenefits', { type: myNFTInfo.data?.mLv })
                } else {
                    setTimeout(() => {
                        setMember(true)
                    }, 500);
                }
            }}>
                <div className={styles.membertext}>
                    <div className={styles.search}>{t('Member Points')}</div>
                    {myNFTPointInfo.isLoading ? <LoadingRow width={20}/> : <div className={styles.membervalue}>{formatBalance(myNFTPointInfo.data?.myPoints || 0)}</div>}
                </div>
                <div className={styles.right}>
                    <img src="/images/right.png" alt="" />
                </div>
            </div>
            <CountDownModal time={COUNTDOWN_TIME} />
        </div>

        < Drawer style={{ zIndex: 100 }} title={t('member benefits')} placement="right" onClose={disSetMember} open={Menmber}
            width={"36%"}
        >
            <Memberbenefits
                type={myNFTInfo.data?.mLv}
                setMembership={setMembership}
                Membership={Membership}
                onClose={() => {
                    if (myNFTInfo.isLoading) { return }
                    setMember(false)
                }} />
        </Drawer >
    </div >


}
export default WalletInfomation

// <Drawer title={t('member benefits')} placement="bottom" onClose={disSetMember} open={Menmber}
//     height={'89.9%'}
//     zIndex={1002}
//     width={'100%'}
// >
//     <Memberbenefits onClose={() => {
//         setMember(false)
//     }} />
// </Drawer>