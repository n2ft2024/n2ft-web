import React, { useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { Input } from "antd";
import './index.scss'
import { useN2RelationContract } from "@/hooks/useContract";
import { N2Relation_ADDRESSSES } from "@/Contract/addresses";
import { useAddressBindStatus, useSendTransactionOld } from "@/Contract";
import { useLoadingContext } from "@/provider/loadingProvider";
import {isAddress} from 'viem'
import LoadingRow from "@/Components/LoadingRow";
const Bind = ({ onClose, type, onBindSuccess }: any) => {
    const [value, setValue] = useState<any>(null)
    const n2relationContract = useN2RelationContract(N2Relation_ADDRESSSES)
    const sendTransaction = useSendTransactionOld()
    const loadingContext = useLoadingContext()
    const addressBindStatus = useAddressBindStatus(value)



    const handleChange = () => {
      if (!value || !n2relationContract || !isAddress(value)){
        return
      }

      sendTransaction.mutate({
        title:'Bind',
        func:n2relationContract.bind,
        args:[value],
        onSuccess:()=>{
          loadingContext.hide()
          onBindSuccess()
        }
      })

    }


    const { t } = useTranslationLanguage()
    return <div className={styles.bg}>
        <div className={styles.rowBetween}>
            <span className={styles.title}>{t('bindFriends')}</span>
            <div className={styles.close} onClick={onClose} >
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.cont}>
            <div className={styles.bindImg}>
                <img src="/images/bind.png" alt="" />
            </div>
            <div className={styles.bindtitle}>
                {t('inviterinformation')}
            </div>
            <Input placeholder={t('pleasecode')} className={styles.bindInput}
                onChange={(e) => {
                    setValue(e.target.value)

                }}
            />
            {addressBindStatus.isLoading && <LoadingRow width={20}/>}
            {!addressBindStatus.isLoading && !addressBindStatus.data?.isBind && isAddress(value) && <div className={styles.tip}>{t('not bind tips')}</div>}
        </div>
        <div onClick={handleChange} className={styles.confirm}
            style={{ background: !isAddress(value) ?"#FFDCC3":(addressBindStatus.isLoading ? '#FFDCC3' : (addressBindStatus.data?.isBind ? "#EF8339" : '#FFDCC3'))}}
        >
            {t('bindnow')}
        </div>
    </div>
}
export default Bind