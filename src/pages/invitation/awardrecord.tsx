import { Table } from 'antd'
import React from 'react'
import styles from './index.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { ColumnsType } from 'antd/es/table'
import { formatAccount } from '@/Common'
interface AwardrecordFace {
    list: any[]
}
const Awardrecord = (props: AwardrecordFace) => {
    const { list } = props;
    const { t } = useTranslationLanguage()
    const statusList = [t('activated'), t('inactivated'), t('Activating')]
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'time',
            title: t('time'),
        },
        {
            dataIndex: 'address',
            title: t('address'),
            render: (_, record) => {
                return (<span>{formatAccount(record.address)}</span>);
            },
        },
        {
            dataIndex: 'c',
            title: t('state'),
            render: (_, record) => {
                return <span>{statusList[0]}</span>
            }
        },
        {
            dataIndex: 'd',
            title: t('award'),
        },
    ]

    return <>
        {
            list?.length > 0 ?  <div className={styles.awardtable}>
                    <Table dataSource={list} columns={columns} pagination={false} rowKey="time" />
                </div>
                : <div className={styles.not}>
                    <div className={styles.nodata}>
                        <img src="/images/nodata.png" alt="" />
                    </div>
                    <div className={styles.notext}>{t('nodata')}</div>
                </div>
        }
    </>
}
export default Awardrecord