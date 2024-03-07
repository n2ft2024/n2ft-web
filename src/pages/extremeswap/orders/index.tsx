import React, { useEffect, useState } from "react";
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import { Alert, Checkbox, Pagination, Table, Tabs, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { history, useParams, useSearchParams } from "umi";
import { ColumnsType } from "antd/es/table";
import { useModalContext } from "@/provider/modalProvider";
import SaleModal from "../salemodal";
import Swapmode from "./Swapmode";
import ModeCont from "./ModeCont";
import MobileSaleTab from "./MobileSaleTab";
import MobileResaleTab from "./MobileResaleTab";
import { useExtremeSwapInfo, useNFTInfo, useNFTListInfo, useNFTSellListInfo, useSendTransactionOld } from "@/Contract";
import { formatBalance } from "@/Common";
import { formatUnits } from "ethers";
import LoadingRow from "@/Components/LoadingRow";
import { mobileModel } from "react-device-detect";
import { useN2SWAPContract } from "@/hooks/useContract";
import { N2SWAP_ADDRESSSES } from "@/Contract/addresses";
import Marquee from 'react-fast-marquee';
import dayjs from "dayjs";
import NotData from "@/Components/NotData";
import { ReactQueryDevtoolsPanel } from "react-query/types/devtools";
function NFTInfo({ item, sellPage }: any) {
    const nftinfo = useNFTInfo(item[1], item[5], item[2], sellPage)
    return <div className={styles.collect}>
        <div className={styles.collectImg}>
            <img src={nftinfo.data?.nftImg} alt="" />
        </div>
        <div className={styles.infocolum}>
            <div className={styles.infoname}>
                Gangster Gorilla
            </div>
            <div className={styles.infonumber}>
                #{item[1].toString()}
            </div>
        </div>
    </div>
}
function NFTPriceInfo({ item, type, sellPage }: any) {
    const nftinfo = useNFTInfo(item[1], item[5], item[2], sellPage)
    return <div className={styles.preprie}>
        <div className={styles.pricetop}>
            <div className={styles.priceIcon}>
                <img src="/tokens/USDT.png" alt="" />
            </div>
            {type == 'buy' ? (!nftinfo.data?.nftBuyPriceToday ? <LoadingRow width={20} /> : <div className={styles.prievalue}>
                {formatBalance(nftinfo.data?.nftBuyPriceToday)}
            </div>) : (!nftinfo.data?.nftBuyPriceYestody ? <LoadingRow width={20} /> : <div className={styles.prievalue}>
                {formatBalance(nftinfo.data?.nftBuyPriceYestody)}
            </div>)}
        </div>
        {/* <div className={styles.priebot}>
        $53,536.84
    </div> */}
    </div>
}

function NFTPriceSellInfo({ item, type, sellPage }: any) {
    const nftinfo = useNFTInfo(item[1], item[5], item[2], sellPage)
    return <div className={styles.preprie}>
        <div className={styles.pricetop}>
            <div className={styles.priceIcon}>
                <img src="/tokens/USDT.png" alt="" />
            </div>
            {type == 'buy' ? (!nftinfo.data?.nftSellPriceToday ? <LoadingRow width={20} /> : <div className={styles.prievalue}>
                {formatBalance(nftinfo.data?.nftSellPriceToday)}
            </div>) : (!nftinfo.data?.nftSellPriceYestody ? <LoadingRow width={20} /> : <div className={styles.prievalue}>
                {formatBalance(nftinfo.data?.nftSellPriceYestody)}
            </div>)}
        </div>
        {/* <div className={styles.priebot}>
        $53,536.84
    </div> */}
    </div>
}
const ExtremeOrders = (props: any) => {
    const { t } = useTranslationLanguage()
    const [tab, setTab] = useState<string>('1')
    const [mobieTab, setMobileTable] = useState<string>('1')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const modalContext = useModalContext()
    const NFTListInfo = useNFTListInfo()
    const [sellPage, setSellPage] = useState(-1)
    const NFTSellListInfo = useNFTSellListInfo(sellPage)
    const [activeKey, setActiveKey] = useState('1')

    const [searchParams, setSearchParams] = useSearchParams()
    const extremeSwapInfo = useExtremeSwapInfo()
    const sendTransaction = useSendTransactionOld()
    const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
    const [currentTime, setCurrentTime] = useState(dayjs.utc().add(8, 'hour'));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs.utc().add(8, 'hour'));
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);
    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();
    const currentSecond = currentTime.second();
    let startTime = 0;
    let endTime = 0;
    let isCanPurchase = false;
    if (currentHour >= 12 && currentHour <= 23) {
        const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond);
        endTime = currentTime.add(leftSecond, 'second').valueOf();
        isCanPurchase = true;
    }
    if (currentHour < 12) {
        const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond);
        startTime = currentTime.add(leftSecond, 'second').valueOf();
        isCanPurchase = false;
    }
    const calculateTimeDifference = () => {
        const currentHour = currentTime.hour();
        const currentMinute = currentTime.minute();
        const currentSecond = currentTime.second();

        let startTime = 0;
        let endTime = 0;
        let isCanPurchase = false;

        if (currentHour >= 12 && currentHour <= 23) {
            const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond);
            endTime = currentTime.add(leftSecond, 'second').valueOf();
            isCanPurchase = true;
        }

        if (currentHour < 12) {
            const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond);
            startTime = currentTime.add(leftSecond, 'second').valueOf();
            isCanPurchase = false;
        }

        const time = isCanPurchase ? endTime : startTime;
        const timeDifference = Math.abs(currentTime.diff(time, 'second'));
        const hours = Math.floor(timeDifference / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);
        const seconds = timeDifference % 60;

        return { hours, minutes, seconds };
    };
    const hanleClick = () => {
        if (extremeSwapInfo.data?.reserveStats) {
            message.warning(t('nirvana'))
        } else {
            const { hours, minutes, seconds } = calculateTimeDifference();
            message.warning(`${hours} ${t('hour')} ${minutes} ${t('mintus')}${seconds}${t('seconds')}${t('later')} `)
        }
    }

    useEffect(() => {
        if (searchParams.get('type')) {
            setActiveKey('2')
        }
    }, [searchParams.get('type')])

    function onPageChange(page: number) {
        console.log('onPageChange==', page)
        setSellPage(page)
    }

    function onNirvana(nftIndex: number) {
        if (extremeSwapInfo.data?.reserveStats) {
            message.warning(t('nirvana'))
            return
        }
        if (!N2SWAPContract) return
        sendTransaction.mutate({
            title: 'Nirvana',
            func: N2SWAPContract.split,
            args: [nftIndex]
        })
    }


    const columns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: t('collections'),
            render: (_, record) => {
                return <NFTInfo item={record} sellPage={sellPage} />
            }
        },
        {
            dataIndex: 'b',
            title: t('pre-sale price'),
            render: (_, record) => {
                return <NFTPriceInfo type='buy' item={record} sellPage={sellPage} />
            }
        },
        {
            dataIndex: 'b',
            title: t('selling price'),
            render: (_, record) => {
                return <NFTPriceSellInfo type='buy' item={record} sellPage={sellPage} />
            }
        },

        {
            dataIndex: 'c',
            title: t('Number of resales'),
            render: (_, record) => {
                console.log('record===', record)
                const count = Number(record[5].toString()) + Number(record[7].toString()) - Number(record[2].toString())
                return <div className={styles.number}>
                    <div className={styles.numberImg}>
                        <img src="/images/check.png" alt="" />
                    </div>
                    <div className={styles.numbervalue}>{count}</div>
                    {/* {isCanPurchase && count >= 30 && <div className={`${styles.Nirvana} ${extremeSwapInfo.data?.reserveStats && styles.NirvanaDis}`}
                        onClick={() => onNirvana(record[8])}>
                        {t('Nirvana Mode')}
                    </div>} */}
                    {isCanPurchase && count >= 30 && count <= 40 && !extremeSwapInfo.data?.reserveStats ? <div className={styles.Nirvana}
                        onClick={() => onNirvana(record[8])}
                    >
                        {t('Nirvana Mode')}
                    </div> : <div className={styles.NirvanaDis}
                        onClick={hanleClick}
                    >
                        {t('Nirvana Mode')}
                    </div>}
                </div>
            }
        },
        // {
        //     dataIndex: 'd',
        //     title: t('Expire date'),
        //     render: (_, record) => {
        //         return <div className={styles.timer}>
        //             <div className={styles.timerImg}>
        //                 <img src="/images/timer.png" alt="" />
        //             </div>
        //             <div className={styles.timervalue}>
        //                 2023-10-02 12:00:00
        //             </div>
        //         </div>
        //     }
        // },
        // {
        //     title: '',
        //     dataIndex: '',
        //     render: (_, record) => {
        //         return (
        //             <div className={styles.action}>
        //                 <div className={styles.resaleben}>{t('extract')}</div>
        //             </div>
        //         );
        //     },
        // },
    ]

    const Resalecolumns: ColumnsType<any> = [
        {
            dataIndex: 'a',
            title: t('collections'),
            // width: '400px',
            render: (_, record) => {
                return <NFTInfo item={record} sellPage={sellPage} />
            }
        },
        {
            dataIndex: 'b',
            title: t('pre-sale price'),
            // width: '200px',
            render: (_, record) => {
                return <NFTPriceInfo type='sell' item={record} sellPage={sellPage} />
            }
        },
        {
            dataIndex: 'b',
            title: t('selling price'),
            render: (_, record) => {
                return <NFTPriceSellInfo type='sell' item={record} sellPage={sellPage} />
            }
        },
        {
            dataIndex: 'c',
            title: t('Number of resales'),
            render: (_, record) => {
                return <div className={styles.number}>
                    <div className={styles.numberImg}>
                        <img src="/images/check.png" alt="" />
                    </div>
                    <div className={styles.numbervalue}>
                        {Number(record[5].toString()) + Number(record[7].toString()) - Number(record[2].toString())}
                    </div>
                </div>
            }
        },
        // {
        //     dataIndex: 'd',
        //     title: t('"Expire date'),
        //     render: (_, record) => {
        //         return <div className={styles.timer}>
        //             <div className={styles.timerImg}>
        //                 <img src="/images/timer.png" alt="" />
        //             </div>
        //             <div className={styles.timervalue}>
        //                 2023-10-02 12:00:00
        //             </div>
        //         </div>
        //     }
        // },

    ]
    const handleShow = () => {
        modalContext.show(
            <SaleModal
                modalContext={modalContext}
                onClose={() => {
                    modalContext.hidden()
                }} onSuccess={() => {
                    console.log(1)
                }} />
        )
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const moilelist = [{
        name: t('My pre-sale'),
        value: '1'
    }, {
        name: t('my resale'),
        value: '2'
    }]
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
    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            <div className={styles.swapview}>
                <Swapmode />
                <ModeCont />
            </div>
            <div style={{ margin: '36px 0' }}>
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            {t('resold')}
                        </Marquee>
                    }
                />
            </div>

            <div className={styles.swapcont}>
                {/* tabBarExtraContent={tab === '1' ? SaleBtn : ResaleBtn} */}
                <Tabs activeKey={activeKey} onTabClick={(e) => {
                    setTab(e)
                    setActiveKey(e)
                }}>
                    <TabPane tab={t('My pre-sale')} key="1" >
                        {NFTListInfo.isLoading ? <LoadingRow width={20} /> : <Table dataSource={NFTListInfo.data?.todayNFTList} columns={columns} pagination={false} rowKey="id"
                            locale={{ emptyText: <NotData /> }}
                        />}
                    </TabPane>
                    <TabPane tab={t('my resale')} key="2">
                        {NFTSellListInfo.isLoading ? <LoadingRow width={40} /> : <Table dataSource={NFTSellListInfo.data?.totalNFTList} columns={Resalecolumns} pagination={false} rowKey="id"
                            locale={{ emptyText: <NotData /> }}  // rowSelection={rowSelection} 
                        />}
                    </TabPane>
                </Tabs>
                {tab == '2' && <PageView info={NFTSellListInfo} onPageChange={onPageChange} />}
            </div>
            {/* {tab === '2' && <div className={styles.moderesale} onClick={handleShow}>
                <div className={styles.moderesaleBtn}
                    style={{
                        color: selectedRowKeys?.length > 0 ? '#FFFFFF' : '#90949A',
                        background: selectedRowKeys?.length > 0 ? '#EF8339' : '#E5E5E5'
                    }}>
                    {t('cruel sale')}
                </div>
            </div>
            } */}
            <div className={styles.mobTab}>
                <div className={styles.mobTabtitle}>
                    {moilelist.map((item: any, index) => {
                        return <div className={styles.mobTabItem}
                            key={index}
                            style={{
                                background: mobieTab === item.value ? '#EF8339' : '#FFFFFF',
                                color: mobieTab === item.value ? "#FFFFFF" : '#000000'
                            }}
                            onClick={() => {
                                setMobileTable(item.value)
                            }}>
                            {item?.name}
                        </div>
                    })}
                </div>
                <>
                    {mobieTab === "1" ? <div className={styles.mobilecontSale}>
                        {/* <div>{SaleBtn}  </div> */}
                        <div className={styles.mobilesalecont}>
                            <div className={styles.mobilecontheader}>
                                <div className={styles.mobilecontd} style={{ flex: 2 }}>
                                    {t('NFT related details')}
                                </div>
                                <div className={styles.mobilecontd} style={{ flex: 1 }}>
                                    {t('Pre-order price')}
                                </div>
                                <div className={styles.mobilecontd} style={{ flex: 1 }}>
                                    {t('selling price')}
                                </div>
                            </div>

                            <div>
                                {
                                    NFTListInfo.isLoading ? <LoadingRow width={20} /> : NFTListInfo.data?.todayNFTList.length ? NFTListInfo.data?.todayNFTList?.map((item, index) => {
                                        return <MobileSaleTab key={'MobileSaleTab' + index} item={item} index={index} sellPage={sellPage} />
                                    }) : <NotData />
                                }
                            </div>
                        </div>
                    </div> : <div className={styles.mobilecontresale}>
                        <div className={styles.mobileresalecont}>
                            <div className={styles.mobilecontheader}>
                                <div className={styles.mobilecontd} style={{ flex: 2 }}>
                                    {t('NFT related details')}
                                </div>
                                <div className={styles.mobilecontd} style={{ flex: 1 }}>
                                    {t('Pre-order price')}
                                </div>
                                <div className={styles.mobilecontd} style={{ flex: 1 }}>
                                    {t('selling price')}
                                </div>
                                {/* <div className={styles.mobilecontd}>
                                  {t('choose')}
                                </div> */}
                            </div>
                            <div>
                                {
                                    NFTSellListInfo.isLoading ? <LoadingRow width={20} /> : NFTSellListInfo.data?.totalNFTList?.length ? NFTSellListInfo.data?.totalNFTList?.map((item, index) => {
                                        return <MobileResaleTab key={'presell' + index} item={item} index={index} isAllChecked={isAllChecked} handleCheckboxChange={handleCheckboxChange} sellPage={sellPage} />
                                    }) : <NotData />
                                }

                            </div>
                            {/* < div className={styles.mobileresales} onClick={handleShow}>
                                <div className={styles.mobileresalesbtn}>
                                      {t('cruel sale')}
                                </div>
                            </div> */}
                            {/* < div className={styles.mobileresales} onClick={handleShow}>
                                <div className={styles.mobileresalesbtn}
                                    style={{
                                        color: selectedIds?.length > 0 ? '#FFFFFF' : '#90949A',
                                        background: selectedIds?.length > 0 ? '#EF8339' : '#F4F7F9'
                                    }}>
                                    {t('cruel sale')}
                                </div>
                            </div> */}
                        </div>
                    </div>}
                </>
                {mobieTab == '2' && <PageView info={NFTSellListInfo} onPageChange={onPageChange} />}
            </div>
        </div>
    </div >
}

export default ExtremeOrders

const PageView = React.memo(({ info, onPageChange }: any) => {
    const { t } = useTranslationLanguage()
    const [currentPage, setCurrentPage] = useState(-1)
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        if (info.data) {
            setCurrentPage(info.data?.dayID - 1)
            setTotalPage(info.data?.dayID - 1)
        }
    }, [info.data])
    console.log('currentPage===', currentPage)
    console.log('totalPage===', totalPage)

    function onPre() {
        if (currentPage > 0) {
            setCurrentPage((pre: number) => pre - 1)
            onPageChange && onPageChange(currentPage - 1)
        }
    }
    function onNext() {
        if (currentPage < totalPage) {
            setCurrentPage((pre: number) => pre + 1)
            if (currentPage + 1 == totalPage) {
                onPageChange && onPageChange(-1)
            } else {
                onPageChange && onPageChange(currentPage + 1)

            }
        }
    }
    return <div className={`${commonStyle.rowEnd} ${styles.pageVeiw}`}>
        <span className={`${styles.pageTitle} ${currentPage == 0 && styles.pageTitleDis}`} onClick={onPre}>{t('the day before')}</span>
        <span className={styles.pageTitle}>{t('day', { day: currentPage + 1 })}</span>
        <span className={`${styles.pageTitle} ${currentPage == totalPage && styles.pageTitleDis}`} onClick={onNext}>{t('the day after')}</span>
    </div>
}, () => true)
