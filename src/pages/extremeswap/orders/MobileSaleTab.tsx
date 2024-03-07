import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import styles from './index.module.scss'
import { useExtremeSwapInfo, useNFTInfo, useSendTransactionOld } from '@/Contract'
import { formatBalance } from '@/Common'
import { formatUnits } from 'ethers'
import LoadingRow from '@/Components/LoadingRow'
import { useN2SWAPContract } from '@/hooks/useContract'
import { N2SWAP_ADDRESSSES } from '@/Contract/addresses'
import dayjs from 'dayjs'
import { message } from 'antd'
import { useEffect, useState } from 'react'
const MobileSaleTab = (props: any) => {
    const nftInfo = useNFTInfo(props.item[1], props.item[5], props.item[2], props.sellPage)
    const { item, index } = props
    const count = Number(item[5].toString()) + Number(item[7].toString()) - Number(item[2].toString())
    const extremeSwapInfo = useExtremeSwapInfo()
    const N2SWAPContract = useN2SWAPContract(N2SWAP_ADDRESSSES)
    const sendTransaction = useSendTransactionOld()
    const { t } = useTranslationLanguage()
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
    function onNirvana(nftIndex: number) {
        // if (extremeSwapInfo.data?.reserveStats) return
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

    return <div key={index} className={styles.mobilesaleItem}>
        <div className={styles.mobdetail} style={{ flex: 2 }}>
            <div className={styles.mobdetiltop}>
                <div className={styles.ItemImg}>
                    <img src={nftInfo.data?.nftImg} alt="" />
                </div>
                <div className={styles.Itemtext}>
                    <div className={styles.Itemtextdesc}>Gangster Gorilla</div>
                    <div className={styles.Itemtextname}>#{item[1].toString()}</div>
                </div>
            </div>
            <div className={styles.mobdetilbot}>
                <div className={styles.mobdetilbotleft}>
                    <div className={styles.mobdetailcheck}>
                        <img src="/images/check.png" alt="" />
                    </div>
                    <div className={styles.mobdetailcheckvalue}>
                        {count}
                    </div>
                    {isCanPurchase && count >= 30 && count <= 40 && !extremeSwapInfo.data?.reserveStats ? <div className={styles.Nirvana}
                        onClick={() => onNirvana(item[8])}
                    >
                        {t('Nirvana Mode')}
                    </div> : <div className={styles.NirvanaDis}
                        onClick={hanleClick}
                    >
                        {t('Nirvana Mode')}
                    </div>}
                </div>
                {/* <div className={styles.mobdetailtimer}>
                  <div className={styles.mobdetailtimericon}>
                      <img src="/images/timer.png" alt="" />
                  </div>
                  <div className={styles.mobdetailtimervalue}>
                      2023-10-02 12:00:00
                  </div>

              </div> */}
            </div>
        </div>
        <div className={styles.mobileprice} style={{ flex: 1 }}>
            <div className={styles.mobilepriceImg}>
                <img src="/tokens/USDT.png" alt="" />
            </div>
            {!nftInfo.data?.nftBuyPriceToday ? <LoadingRow width={20} /> : <div className={styles.mobilepricetext}>
                {formatBalance(nftInfo.data?.nftBuyPriceToday)}
            </div>}
        </div>
        <div className={styles.mobileprice} style={{ flex: 1 }}>
            <div className={styles.mobilepriceImg}>
                <img src="/tokens/USDT.png" alt="" />
            </div>
            {!nftInfo.data?.nftSellPriceToday ? <LoadingRow width={20} /> : <div className={styles.mobilepricetext}>
                {formatBalance(nftInfo.data?.nftSellPriceToday)}
            </div>}
        </div>
        {/* <div className={styles.mobileaction}>
          <div className={styles.mobileshow}>
              立即出售
          </div>
          <div className={styles.mobileextract}>
              提取
          </div>
      </div> */}
    </div>
}
export default MobileSaleTab