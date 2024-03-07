import React, { useState } from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import { Checkbox, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useModalContext } from "@/provider/modalProvider";
import ExtractModal from "./extractModal";
import ExtractResult from "./extractResult";
import useMedia from "use-media";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const Extract = () => {
    const { t } = useTranslationLanguage()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const modalContext = useModalContext()
    const isMobile = useMedia({ maxWidth: '768px' })
    const [mobileRowkeys, setMobileRowkeys] = useState<any[]>([])
    const extractcolumns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: '',
            width: '400px',
            render: (_, record) => {
                return <div className={styles.collect}>
                    <div className={styles.collectImg}>
                        <img src="/images/market.png" alt="" />
                    </div>
                    <div className={styles.infocolum}>
                        <div className={styles.infoname}>
                            Doodles_LLC
                        </div>
                        <div className={styles.infonumber}>
                            Doodle#7770
                        </div>
                    </div>
                </div>
            }
        },
        {
            dataIndex: 'b',
            title: '',
            width: '200px',
            render: (_, record) => {
                return <div className={styles.preprie}>
                    <div className={styles.pricetop}>
                        <div className={styles.priceIcon}>
                            <img src="/images/usdt.png" alt="" />
                        </div>
                        <div className={styles.prievalue}>
                            13132
                        </div>
                    </div>
                    <div className={styles.priebot}>
                        $53,536.84
                    </div>
                </div>
            }
        },
        {
            dataIndex: 'c',
            title: '',
            render: (_, record) => {
                return <div className={styles.number}>
                    <div className={styles.numberImg}>
                        <img src="/images/check.png" alt="" />
                    </div>
                    <div className={styles.numbervalue}>
                        23次
                    </div>
                </div>
            }
        },
        {
            dataIndex: 'd',
            title: '',
            render: (_, record) => {
                return <div className={styles.timer}>
                    <div className={styles.timerImg}>
                        <img src="/images/timer.png" alt="" />
                    </div>
                    <div className={styles.timervalue}>
                        2023-10-02 12:00:00
                    </div>
                </div>
            }
        },

    ]
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const data: any = [{
        id: '1',
        a: '1',
        b: '2',
        c: '3',
        d: '4'
    }, {
        id: '2',

        a: '2',
        b: '5',
        c: '6',
        d: '7'
    }, {
        id: '3',

        a: '213',
        b: '33',
        c: '44',
        d: '55'
    }]
    const handleExtract = () => {
        modalContext.show(
            // <ExtractResult
            //     type={true}
            //     onClose={() => {
            //         modalContext.hidden()
            //     }}
            // />
            <ExtractModal
                modalContext={modalContext}
                onClose={() => {
                    modalContext.hidden()
                }}
                onSuccess={() => {
                    console.log(1)
                }} />
        )
    }

    const onChangeMobile = (value: any) => {
        if (mobileRowkeys.includes(value)) {
            const newMobileRowkeys = mobileRowkeys.filter((id: any) => id !== value);
            setMobileRowkeys(newMobileRowkeys);
        } else {
            setMobileRowkeys([...mobileRowkeys, value]);
        }
    };
    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            {
                isMobile ? <MobileTable onChangeMobile={onChangeMobile} modalContext={modalContext} mobileRowkeys={mobileRowkeys} /> : <>
                    <div className={styles.extract_title}>
                        {t('Choose NFt')}
                    </div>
                    <div className={styles.extract_table}>
                        <Table dataSource={data} columns={extractcolumns} pagination={false} rowKey="id"
                            rowSelection={rowSelection} />
                    </div>
                    <div className={styles.extract_footer}>
                        <div className={styles.extract_btn}
                            style={{
                                color: selectedRowKeys?.length ? '#FFFFFF' : '#90949A',
                                background: selectedRowKeys?.length ? '#EF8339' : '#E5E5E5'
                            }}
                            onClick={handleExtract}
                        >
           {t('cruel extraction')}

                        </div>
                    </div>
                </>
            }

        </div>
    </div>
}
export default Extract;
const MobileTable = (props: any) => {
    const { onChangeMobile, modalContext, mobileRowkeys } = props
    const { t } = useTranslationLanguage()
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', checked: false },
        { id: 2, name: 'Item 2', checked: false },
        { id: 3, name: 'Item 3', checked: false },
    ]);
    const handleCheckboxChange = (itemId: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSelectAllChange = () => {
        setItems((prevItems) =>
            prevItems.map((item) => ({ ...item, checked: !isAllChecked }))
        );
    };
    const isAllChecked = items.every((item) => item.checked);
    const selectedIds = items.filter((item) => item.checked).map((item) => item.id);
    console.log(selectedIds, 'selectedIds')
    const handleShow = () => {
        modalContext.show(
            <ExtractModal
                modalContext={modalContext}
                onClose={() => {
                    modalContext.hidden()
                }} onSuccess={() => {
                    console.log(1)
                }} />
        )
    }
    return <>
        <div className={styles.mobileAll}>
            <div className={styles.mobilerow}>
                {t('Choose NFt')}
            </div>
            <div className={styles.mbileallcheck}  >
                <div className={styles.mbileallchecktext}>
                    {t('select all')}
                </div>
                <Checkbox checked={isAllChecked} onChange={handleSelectAllChange} />
            </div>
        </div>
        <div className={styles.mobileresalecont}>
            <div className={styles.mobilecontheader}>
                <div className={styles.mobilecontd}>
                    {t('NFT related details')}

                </div>
                <div className={styles.mobilecontd}>
                    {t('Pre-order price')}
                </div>
                <div className={styles.mobilecontd}>
                    {t('choose')}
                </div>
            </div>
            <div>
                {
                    items?.map((item, index) => {
                        return <MobileResaleTab item={item} index={index} isAllChecked={isAllChecked} handleCheckboxChange={handleCheckboxChange} />
                    })}

            </div>
            < div className={styles.mobileresales} onClick={handleShow}>
                <div className={styles.mobileresalesbtn}
                    style={{
                        color: mobileRowkeys?.length > 0 ? '#FFFFFF' : '#90949A',
                        background: mobileRowkeys?.length > 0 ? '#EF8339' : '#F4F7F9'
                    }}>
                    {t('cruel sale')}


                </div>
            </div>

        </div>
    </>
}
interface MobileResaleTabProps {
    item: any;
    index: string | number
    handleCheckboxChange: Function
    isAllChecked: any
}
const MobileResaleTab = (props: MobileResaleTabProps) => {
    const { item, index, isAllChecked, handleCheckboxChange } = props
    return <div className={styles.mobileresale} key={index}>
        <div className={styles.mobileresaledetail}>
            <div className={styles.mobiledetailImg}>
                <img src="/images/signal_nft1.png" alt="" />
            </div>
            <div className={styles.mobledetailinfo}>
                <div className={styles.mobledetailinfo_top}>Doodles_LLC</div>
                <div className={styles.mobledetailinfo_bot}>Doodle#7770</div>
            </div>

        </div>
        <div className={styles.mobilerepice}>
            <div className={styles.mobilerepicetop}>
                <img src="/images/usdt.png" alt="" />
            </div>
            <div className={styles.mobilerepicebot}>
                45.23
            </div>
        </div>
        <div className={styles.mobileselect} >
            <Checkbox
                checked={isAllChecked || item.checked}
                onChange={() => handleCheckboxChange(item.id)} />

        </div>
    </div>
}