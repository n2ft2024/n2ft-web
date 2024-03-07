import React from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import Table, { ColumnsType } from "antd/es/table";
import { history } from 'umi'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const SaleDetail = () => {
    const {t}=useTranslationLanguage()
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
        {
            title: '',
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <div className={styles.action}
                        onClick={() => {
                            history.push('/extremeswap/orders/resaledetail/item')
                        }}>
                        {
                            record?.status === "0" && <div className={styles.statusfinish}>
                              {t('completed')}
                            </div>
                        }
                        {
                            record?.status === "1" && <div className={styles.statuspending}>
                            {t('In progress')}
                            </div>
                        }

                        <div className={styles.rightIcon}>
                            <img src="/images/right.png" alt="" />
                        </div>
                    </div>
                );
            },
        },
    ]
    const list: any = [
        {
            status: '1'
        },
        {
            status: '0'
        }
    ]
    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            <div className={styles.title}>
    {t('withdrawal details')}
            </div>
            <div className={styles.cont}>
                <Table dataSource={list} columns={columns} pagination={false} rowKey="id"
                />
            </div>
        </div>
    </div>
}
export default SaleDetail