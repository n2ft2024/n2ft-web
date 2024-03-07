import React from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const ResaleItem = (props: any) => {
    const { status = "1" } = props
    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            <div className={styles.resaleItem}>
                <ResaleItemIttle />
                <div className={styles.mobilecont}>
                    <div className={styles.mobilecheck}>
                        <div className={styles.mobilecheckIcon}>
                            <img src="/images/check.png" alt="" />
                        </div>
                        <div className={styles.mobilechecktext}>
                            check
                        </div>
                    </div>
                    <div className={styles.mobiletimer}>
                        <div className={styles.mobiletimerIcon}>
                            <img src="/images/timer.png" alt="" />
                        </div>
                        <div className={styles.mobiletimertext}>
                            2023-10-02 12:00:00

                        </div>
                    </div>
                </div>
                <div className={styles.ItemTable}>
                    {status === "1" && <PendingTable />}
                    {status === "2" && <FinishTable />}
                    {status === "3" && <ExtractTable />}
                </div>
            </div>


        </div>
    </div>

}
export default ResaleItem

const ResaleItemIttle = (props: any) => {
    const { status = "1" } = props
    const {t}=useTranslationLanguage()
    return <div className={styles.title}>
        <div className={styles.top}>
          {t('Resale NFT details')}
        </div>
        <div className={styles.titlecont}>
            <div className={styles.info}>
                <div className={styles.infoImg}>
                    <img src="/images/market.png" alt="" />
                </div>
                <div className={styles.infocolum}>
                    <div className={styles.infoname}>
                        12
                    </div>
                    <div className={styles.infonumber}>
                        123
                    </div>
                </div>
            </div>
            <div className={styles.check}>
                <div className={styles.checkIcon}>
                    <img src="/images/check.png" alt="" />
                </div>
                <div className={styles.checktext}>
                    check
                </div>
            </div>
            <div className={styles.timer}>
                <div className={styles.timerIcon}>
                    <img src="/images/timer.png" alt="" />
                </div>
                <div className={styles.timertext}>
                    2023-10-02 12:00:00

                </div>
            </div>
            {status === "1" && <div className={styles.statuspending}>
              {t('completed')}
            </div>}
            {status === "2" && <div className={styles.statusfinish}>
               {t('completed')}
            </div>}
            {status === "3" && <div className={styles.statusextract}>
       {t('Extracted')}
            </div>}


        </div>
    </div>
}
const PendingTable = () => {
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: '',
        },
        {
            dataIndex: 'b',
            title: '',
        },
        {
            dataIndex: 'c',
            title: '',
        },
        {
            dataIndex: 'd',
            title: '',
        },
    ]
    const list: any = [
        {
            d: '1',
            id:'1'
        }
    ]
    return <Table dataSource={list} columns={columns} pagination={false} rowKey="id"

    />
}

const FinishTable = () => {
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: '',
        },
        {
            dataIndex: 'b',
            title: '',
        },
        {
            dataIndex: 'c',
            title: '',
        },
        {
            dataIndex: 'd',
            title: '',
        },
    ]
    const list: any = [
        {
            status: '1'
        }
    ]
    return <Table dataSource={list} columns={columns} pagination={false} rowKey="id"
    />
}
const ExtractTable = () => {
    const columns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: '',
        },
        {
            dataIndex: 'b',
            title: '',
        },
        {
            dataIndex: 'c',
            title: '',
        }
    ]
    const list: any = [
        {
            status: '1'
        }
    ]
    return <Table dataSource={list} columns={columns} pagination={false} rowKey="id"
    />
}