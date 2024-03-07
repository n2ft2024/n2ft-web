import React, { useState } from "react"
import styles from './index.module.scss'
import { Input } from "antd"
import './styles.scss'
import NodeItem from "@/Components/NodeItem"
const MobileSearch = () => {
    const [accountdata, setAccountdata] = useState<any[]>([])
    return <div className={styles.mobilesearch}>
        <div className={styles.mobilesearchbox+'search-input'}>
            <Input className={styles.mobileinput} allowClear />
            <div className={styles.mobilesearchIcon}>
                <img src="/images/search.png" alt="" />
            </div>
        </div>

        {accountdata?.length &&
            <NodeItem accountList={[]} collectionlist={[]} isLoading={false} />||null
        }
    </div>
}
export default MobileSearch