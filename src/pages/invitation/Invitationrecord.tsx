import { Table } from 'antd'
import React from 'react'
import styles from './index.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { ColumnsType } from 'antd/es/table'
interface InvitationrecordFace {
    list: any[]
}
const Invitationrecord = (props: InvitationrecordFace) => {
    const { list } = props;
    const { t } = useTranslationLanguage()
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: 'time',
        },
    ]
    return <div>
        {
            list?.length > 0 ? <div className={styles.invitationrecord}>
  <Table dataSource={list} columns={columns} pagination={false}  rowKey="id"/>
            </div>
           : <div className={styles.not}>
                <div className={styles.nodata}>
                    <img src="/images/nodata.png" alt="" />
                </div>
                <div className={styles.notext}>{t('nodata')}</div>
            </div>
        }
    </div>
}
export default Invitationrecord