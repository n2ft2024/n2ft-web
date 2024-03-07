import styles from './style.module.scss'
import NotData from "@/Components/NotData";
import useMedia from "use-media";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { history } from 'umi'
import RoundChart from "./Chart";
import { useModalContext } from "@/provider/modalProvider";
import DetailModal from "./Transactionhistory";

const Historical = () => {
    const isMobile = useMedia({ maxWidth: '768px' })
    const { t } = useTranslationLanguage()
    const modalContext = useModalContext()
    const onChangeDetail = () => {
        modalContext.show(
            <DetailModal onClose={() => {
                modalContext.hidden()
            }} />
        )
    }
    const list: any = [
        {
            status: 1,
            a: "1",
            list: [
                {
                    value: 28,
                    total: 80,
                },
            ]
        },
        {
            status: 2,
            a: "2",
            list: [
                {
                    value: 80,
                    total: 80,
                },
            ]
        },
    ]
    const theaList = [{ name: t('type') },
    { name: `${t('Trading price')}(USDT)` },
    { name: `${t('Number of transactions')} (SOL)` },
    { name: `${t('Total')}(USDT)` },
    { name: t('transaction hour') },
    { name: t('operate') },
    { name: '' },]
    const ele = () => {
        return <table>
            <thead className={styles.thead}>
                {theaList?.map((item: any) => {
                    return <tr>{item?.name}</tr>
                })
                }
            </thead>
            <tbody>
                {list.map((record: any) => {
                    return <div className={styles.tbody_box}>
                        <tr>
                            {record?.status === 1 ? <div className={styles.type_bs}>
                                <RoundChart data={record?.list} status={record?.status} />
                                <div className={styles.type_bslab}>
                                    <span className={styles.buylabel}>{t('goBuy')}</span>
                                    <span className={styles.busval}>{t('USDT')}</span>
                                </div>

                            </div> :
                                <div className={styles.type_bs}>
                                    <RoundChart data={record?.list} />
                                    <div className={styles.type_bslab}>
                                        <span className={styles.selllabel}>{t('sell')}</span>
                                        <span className={styles.busval}>{t('USDT')}</span>
                                    </div>
                                </div>}
                        </tr>
                        <tr>
                            22
                            {/* {record?.status === 1 ? <div className={styles.buy_price}>
                                0.67
                            </div> : <div className={styles.sell_price}>0.98
                            </div>} */}
                        </tr>
                        <tr>
                            16.96
                        </tr>
                        <tr>
                            46.6223
                        </tr>
                        <tr>
                            2023-12-16 17:00:00
                        </tr>
                        <tr>
                            {record?.status === 1 ? <div className={styles.Cancelled}>{t('Cancelled')}</div> :
                                <div className={styles.finish}>   {t('completed')}</div>}
                        </tr>
                        <tr className={styles.detail} onClick={onChangeDetail}>
                            <div className={styles.detail_text}> {t('check the details')}  </div>
                            <img src="/images/right.png" alt="" className={styles.rightImg} />

                        </tr>
                    </div>
                })

                }
            </tbody>
        </table>
    }
    return <>
        {
            isMobile ? <>{list?.map((item: any, index: any) => {
                return <MobileHistorical key={index} item={item} />
            })}</> : <div className={styles.tradint_Table}>
                {
                    list?.length > 0 ?
                        <> {ele()}</>
                        : <NotData />
                }

            </div>
        }

    </>

}
export default Historical
interface MobileHistoricalProps {
    item: any;
    key: number
}
const MobileHistorical = (props: MobileHistoricalProps) => {
    const { item, key } = props;
    const type = 1
    const { t } = useTranslationLanguage()
    console.log(item, 'item')
    return <div className={styles.MobileTrading} key={key}>
        <div className={styles.mobile_title}>
            <div className={styles.mobile_label}>
                <div className={styles.mobile_buy_lab}
                    style={{ color: type === 1 ? '#26A17B' : 'E33D3D' }}>
                    {type === 1 ? t('goBuy') : t('sell')}
                </div>
                <div className={styles.mobile_buy_text}>
                    {t('USDT')}
                </div>
            </div>
            <div className={styles.mobile_timerbox} onClick={() => {
                history.push('/transactionhistory', { state: { params: item } })
            }}>
                <div className={styles.mobile_timer}>2023-12-16 17:00:00</div>
                <img src="/images/right.png" alt="" className={styles.rightImg} />
            </div>
        </div>
        <div className={styles.mobile_cont}>
            <div className={styles.mobile_left}>
                <div className={styles.mobile_hisinfobox}>
                    <div >
                        <RoundChart data={item?.list} status={item?.status} />
                    </div>
                    <div className={styles.mobile_infobox}>
                        <div className={styles.mobile_info}>
                            <div className={styles.mobile_info_label}>
                                {t('Number of transactions')}
                            </div>
                            <div className={styles.mobile_info_val}>
                                16.98
                            </div>
                        </div>
                        <div className={styles.mobile_info}>
                            <div className={styles.mobile_info_label}>
                                {t('Trading price')}
                            </div>
                            <div className={styles.mobile_info_val}>
                                16.98
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {type == 1 ? <div className={styles.mobile_btn}>
                {t('Cancelled')}
            </div> : <div className={styles.mobile_finish}>
                {t('completed')}
            </div>
            }
        </div>
    </div>
}
