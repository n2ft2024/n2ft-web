import React, { useEffect, useState } from "react";
import styles from './inde.module.scss'
import { Input, Spin, message } from "antd";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useMyNFTPointInfo, useN2NPoolData, usePointerPrice, useSendTransactionOld } from "@/Contract";
import { useN2NPOOLContract, } from "@/hooks/useContract";
import { N2NPOOL_ADDRESSSES, USDT_ADDRESSSES } from "@/Contract/addresses";
import { useLoadingContext } from "@/provider/loadingProvider";
import { ApprovalState, formatBalance } from "@/Common";
import { useApprove, useWalletInfo } from "@/hooks/useTokenContract";
import { parseUnits } from "ethers";
import dayjs from 'dayjs'
import CountDown from '@/pages/extremeswap/CountDown'
import commonStyles from '@/Common/common.module.scss'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const Top = () => {
    const [active, setActive] = useState<number>(1)
    const [current, setCurrent] = useState<any>(0)
    const { t } = useTranslationLanguage()
    const [number, setNumber] = useState<number | string>(1)
    const sendTransaction = useSendTransactionOld()
    const poolData = useN2NPoolData()
    const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)
    const loadingContext = useLoadingContext()
    const pointerPrice = usePointerPrice(number)
    const [approveStatus, approve] = useApprove(USDT_ADDRESSSES, N2NPOOL_ADDRESSSES, pointerPrice.data?.viewBuyPrice)
    const walletInfo = useWalletInfo()
    const myNFTPointInfo = useMyNFTPointInfo()


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
    const [canClick, setCanClick] = useState(isCanPurchase)
    // const [canClick, setCanClick] = useState(true)


    const [loading, setLoading] = useState<boolean>(false)
    const priceList = [
        {
            price: -2,
        },
        {
            price: -1,
        },
        {
            price: 0,
        },
        {
            price: 1,
        },
        {
            price: 2,
        },
    ]




    const handleQuarent = (item: any) => {
        let enterItem = item
        console.log('====', item)
        if (active == 0) {
            if (!pointerPrice.data?.maxBuyAmount) {
                setNumber(enterItem + '')
                return
            }
            if (Number(item) > (pointerPrice.data?.maxBuyAmount || 0)) {
                enterItem = pointerPrice.data?.maxBuyAmount
            } else {
                enterItem = item
            }
        } else {
            if (!pointerPrice.data?.maxSellAmount) {
                setNumber(enterItem + '')
                return
            }
            if (Number(item) > (pointerPrice.data?.maxSellAmount || 0)) {
                enterItem = pointerPrice.data?.maxSellAmount
            } else {
                enterItem = item
            }
        }
        console.log('enterItem====', enterItem)
        setNumber(enterItem + '')
    }

    const handleChange = () => {
        if (Number(number) === 0) {
            return
        }
        if (!N2NPOOLContract) {
            return
        }
        if (active == 1) {
            console.log(Number(formatBalance(walletInfo.data?.USDT)) < Number(pointerPrice.data?.viewBuyPrice || 0) * Number(number), Number(formatBalance(walletInfo.data?.USDT)) == 0, 'asdd')
            if (Number(formatBalance(walletInfo.data?.USDT)) == 0 || Number(formatBalance(walletInfo.data?.USDT)) < Number(pointerPrice.data?.viewBuyPrice || 0) * Number(number)) {
                message.warning(t('Insufficient wallet balance'))
                return
            }
            if (approveStatus != ApprovalState.APPROVED) {
                approve && approve()
                return
            }
            setLoading(true)
            sendTransaction.mutate({
                title: 'buyPoints',
                func: N2NPOOLContract.buyPoints,
                args: [parseUnits(number + '')],
                onSuccess: () => {
                    loadingContext.hide()
                    setLoading(false)
                    setNumber(1)
                },
                onError: () => {
                    setLoading(false)
                }
            })
        } else {
            if (Number(myNFTPointInfo.data?.myPoints) == 0 || Number(myNFTPointInfo.data?.myPoints) < Number(pointerPrice.data?.viewSellPrice || 0) * Number(number)) {
                message.warning(t('Not enough points'))
                return
            }
            setLoading(true)

            sendTransaction.mutate({
                title: 'sellPoints',
                func: N2NPOOLContract.sellPoints,
                args: [parseUnits(number + '')],
                onSuccess: () => {
                    loadingContext.hide()
                    setLoading(false)
                },
                onError: () => {
                    setLoading(false)
                }
            })

        }

    }
    return <div className={styles.top}>
        <div className={styles.top_title}>
            <div className={styles.top_label}> N2FT/USDT</div>
            {/* <div className={styles.top_val}> -2.35%</div> */}
        </div>
        <div className={styles.top_btn}>
            <div onClick={() => {
                setActive(1)
            }}
                className={`${styles.top_it_btn} ${active === 1 && styles.top_buy}`}>
                {t('goBuy')}
            </div>
            <div onClick={() => {
                setActive(2)
            }}
                className={`${styles.top_it_btn} ${active === 2 && styles.top_sell}`}>
                {t('sell')}
            </div>
        </div>

        <div className={styles.select_title}>
            {t('unit price')}:{formatBalance(active == 1 ? (pointerPrice.data?.viewBuyPrice || 0) : pointerPrice.data?.viewSellPrice || 0)} USDT
        </div>
        {/* <div className={styles.top_pricebox}>
            {
                priceList?.map((item, index) => {
                    return <div className={`${styles.price_it} ${current === item?.price ? active == 1 ? styles.buycurrent : styles.sellcurrent : styles.price_it}`} key={index}
                        onClick={() => {
                            handleprice(item.price)
                        }}>{item?.price} %</div>
                })
            }
        </div> */}
        <div className={styles.select_title}>
            {t('Enter transaction quantity')}
        </div>
        <div className={styles.number_trans}>
            <Input type="number" value={number} className={styles.trans_input} placeholder={`${t('Number of transactions')} (SOL)`} onChange={(e) => {
                handleQuarent(e.target.value)
            }}
            />
            <div className={styles.number_val}>
                {t('points title')}
            </div>
        </div>
        <div className={styles.select_title}>
            {t('pricetotal')}
        </div>
        <div className={styles.quota_trans}>
            <Input type="number" className={styles.quota_input} placeholder={t('Transaction volume')} disabled value={formatBalance(active == 1 ? Number(pointerPrice.data?.viewBuyPrice || 0) * Number(number) : Number(pointerPrice.data?.viewSellPrice || 0) * Number(number))} />
            <div className={styles.quota_val}> USDT </div>
        </div>

        {/* <div className={styles.available}>
            <div className={styles.available_label}>
                {t('Available')}
            </div>
            {poolData.isLoading ? <LoadingRow width={20} /> : <div className={styles.available_val}>
                {poolData?.data?.points}
            </div>}
        </div> */}
        {canClick && <Spin spinning={loading}>
            <div className={`${styles.btn} ${active == 1 ? styles.top_buy : styles.top_sell}`} onClick={handleChange}>
                {active === 1 ? t('goBuy') : t('sell')}
            </div>
        </Spin>}
        {!canClick && <div className={`${commonStyles.rowCenter} ${styles.countView}`}>
            <CountDown
                // setPurchase={setCanPurchase}
                date={startTime}
                canPurchase={canClick}
                changePurchase={() => setCanClick(true)}
            />
        </div>}

    </div>
}
export default Top