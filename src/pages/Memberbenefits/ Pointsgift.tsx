import React, { useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { Input, InputNumber, Spin, message } from "antd";
import {   useMyNFTPointInfo, useSendTransactionOld } from "@/Contract";
import { useN2NPOOLContract } from "@/hooks/useContract";
import { N2NPOOL_ADDRESSSES } from "@/Contract/addresses";
import { formatBalance } from "@/Common";
import BigNumber from 'bignumber.js'
import { parseUnits } from "ethers";

const Pointsgift = ({ onClose, modalContext }: any) => {
    const { t } = useTranslationLanguage()
    const [addressValue, setAddressValue] = useState<string | number>('')
    const [numbervalue, setNumberValue] = useState<string | number>('')
    const sendTransaction = useSendTransactionOld()
    const N2NPOOLContract = useN2NPOOLContract(N2NPOOL_ADDRESSSES)
    const myNFTPointInfo = useMyNFTPointInfo()
    const [Loading, setLoading] = useState<boolean>(false)
    const handleClick = () => {
        if (Loading)return
        if (!addressValue) {
            message.warning(t('points address'))
            return
        }
        if (!numbervalue) {
            message.warning(t('bonus points'))
            return
        }
        if (Number(numbervalue)> Number(myNFTPointInfo.data?.claimedReward)) {
            message.warning(t('current points'))
            return
        }
        if (!N2NPOOLContract) {
            return
        }
        setLoading(true)
        const args = [addressValue, parseUnits(numbervalue + '')]
        sendTransaction.mutate({
            title: 'transferPoints',
            func: N2NPOOLContract?.transferPoints,
            args: args,
            onSuccess: () => {
                setLoading(false)
                modalContext.hidden()
            },
            onError: () => {
                setLoading(false)

            }
        })
    }

    return <div className={styles.pointsgift}>
        <div className={styles.rowBetween}>
            <span className={styles.title}>
                {t('Points gift')}

            </span>
            <div className={styles.close} onClick={onClose}>
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.addressbox}>
            <Input className={styles.trans_input} placeholder={t('points address')} onChange={(e: any) => {
                setAddressValue(e.target.value)
            }}
            />
        </div>
        <div className={styles.addressbox}>
            <InputNumber type="number" className={styles.trans_input} placeholder={t('bonus points')} onChange={(e: any) => {
                setNumberValue(e)

            }}
            />
        </div>
        <div style={{ color: '#EF8339', marginTop: '2px' }}>
            {t('input quantity')} {(BigNumber(numbervalue).times(Number(0.95)))?.toNumber()||0}
        </div>

        <Spin spinning={Loading}>
            <div className={styles.poinsbtn}>
                <div onClick={handleClick} className={styles.poins}>
                    {t('Confirm')}
                </div>
            </div>

        </Spin>



    </div>
}

export default Pointsgift