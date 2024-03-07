import React, { useCallback, useEffect, useState } from "react";
import styles from './index.module.scss'
import { formatAccount } from "@/Common";
import { useAccount } from "wagmi";
import multiavatar from "@multiavatar/multiavatar/esm";
import copy from "copy-to-clipboard";
import _ from 'lodash'
const ConpyAddress = () => {
    const [copySuccess, setCopysuccess] = useState<boolean>(false)
    const { address } = useAccount()
    const addressString: any = address?.toString()
    useEffect(() => {
        setTimeout(() => {
            setCopysuccess(false)
        }, 2000);
    }, [copySuccess])
    const handleClick = useCallback(_.throttle((e: any) => {
        copy(addressString)
        setCopysuccess(true)
    },3000),[address])
    return <div className={styles.copy} onClick={handleClick}>
        {copySuccess ? <img src="/images/success.png" alt="" /> : <img src="/images/copy_dark.png" alt="" />}
    </div>
}
export default ConpyAddress