import styles from './trading.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import useMedia from "use-media";
import { history } from 'umi'
import { Drawer } from 'antd';
import BuySale from '../buysale';
import { useModalContext } from '@/provider/modalProvider';
import dayjs from 'dayjs';
import Pointsgift from './ Pointsgift';
const TradingNoda = (props: any) => {
    const { t } = useTranslationLanguage()
    const { setbuytype, onClose, setMembership, Membership } = props;
    const isMobile = useMedia({ maxWidth: '768px' })
    const modalContext = useModalContext()
    const currentTime = dayjs.utc().add(8, 'hour')
    const currentHour = currentTime.hour()
    const currentMinute = currentTime.minute()
    const currentSecond = currentTime.second()

    let startTime = 0
    let endTime = 0
    let isCanPurchase = false
    if (currentHour >= 12 && currentHour <= 24) {
        const leftSecond = (24 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
        endTime = (dayjs().unix() + leftSecond) * 1000
        isCanPurchase = true
    }
    if (currentHour < 12) {
        const leftSecond = (12 - currentHour - 1) * 3600 + (60 - currentMinute - 1) * 60 + (60 - currentSecond)
        startTime = (dayjs().unix() + leftSecond) * 1000
        isCanPurchase = false
    }
    return <div className={styles.tradingNoda}>
        <div className={styles.tradingImg}>
            <img src="/images/shopping.png" alt="" className={styles.nodata} />
        </div>
        <div className={styles.notext}> {t('member yet')} </div>
        <div className={styles.notbtnbox}>
            <div className={styles.notbtn} onClick={() => {
                if (isMobile) {
                    history.push('/buysale')
                } else {
                    onClose()
                    setTimeout(() => {
                        setMembership(true)
                    }, 300);
                }
            }}>
                {t('member now')}
            </div>
           
        </div>
        <div className={styles.relBtn}>
            {/* <div className={styles.points}>
                {t('Receive points')}
            </div> */}
            <div className={styles.trading} onClick={() => {
                // onClose()
                // history.push('/PointsTrading')
                if (isMobile) {
                    history.push('/PointsTrading')
                } else {
                    onClose()
                    history.push('/PointsTrading')
                    // setTimeout(() => {
                    //     setMembership(true)
                    // }, 300)
                }
            }}>
                {t('Points trading')}
            </div>
            {!isCanPurchase? <div className={styles.tradingTrans} >
                {t('Points gift')}
            </div>: <div className={styles.trading} onClick={() => {
                modalContext.show(
                    <Pointsgift
                        onClose={() => {
                            modalContext.hidden()
                        }}
                        modalContext={modalContext} />
                )
            }}>
                {t('Points gift')}

            </div>
            }
            
        </div>
        <Drawer title={t('Buy membership')} placement="right"
            onClose={() => {
                setMembership(false)
            }}
            open={Membership}
            className={styles.drawer_width}
        >
            <BuySale onClose={()=>{
              setMembership(false)
            }}/>
        </Drawer>

    </div>
}
export default TradingNoda