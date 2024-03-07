import React, { useEffect, useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useTodayNFTInfo } from "@/Contract";
import { formatBalance } from "@/Common";
import { formatUnits } from "ethers";
import LoadingRow from "@/Components/LoadingRow";
import { Image } from 'antd';

// item
// struct NFTInfo {
//   address tokenContract;
//   uint256 tokenID;
//   uint256 initDayID;
//   uint256 initPrice;
//   address initAddress;
//   uint256 initCycle;
//   bool claimedStats;
// }
const preview = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABtJREFUGFdj/P/t/3+GHU8YGL3sGf9vP8TAAABd9wiUnal8mQAAAABJRU5ErkJggg==";

function ImageItem({nftImg}:any){
  return <Image id={nftImg} width={'100%'} preview={false}
    placeholder={<Image
      preview={false}
      src={'/images/nftdef.png'}
      width={'100%'}
    />}
    src={nftImg}
  />
}
const Market = ({item}:any) => {
    const { t } = useTranslationLanguage()
    const nftInfo = useTodayNFTInfo(item[1],item[5],item[2])
    return <div className={styles.market}>
        <ImageItem nftImg={nftInfo.data?.nftImg}/>
        <div className={styles.cont}>
            <div className={styles.marketdesc}>
              Gangster Gorilla
            </div>
            <div className={styles.markettitle}>
              #{item[1].toString()}
            </div>
            <div className={styles.marketdetail}>
                <div className={styles.detalleft}>
                    <div className={styles.detailImg}>
                        <img src="/tokens/USDT.png" alt="" />
                    </div>
                    {!nftInfo.data?.nftBuyPriceToday ? <LoadingRow width={20}/> : <div className={styles.detailvalue}>
                        {formatBalance(nftInfo.data?.nftBuyPriceToday)}
                    </div>}
                </div>
                {/* <div className={styles.markeright}>
                    <div className={styles.marketdetailtext}>
                        {t('detail')}
                    </div>
                    <img className={styles.detailrightIcon} src="/images/right.png" alt="" />
                </div> */}
            </div>
        </div>
        {/* <div className={styles.footer}>
            <div className={styles.timer}>
                {t('lastTime')}
            </div>
            <div className={styles.footerright}>
                <img className={styles.footerIcon} src="/images/eth1.png" alt="" />
                <div className={styles.footervalue}>
                    0.1208
                </div>
            </div>
        </div> */}
        {/* <div className={styles.buy}>
            <div className={styles.butbtn}>
                {t('buynow')}
            </div>
            <div className={styles.ellipsis} >
                <img className={styles.ellipsisImg} src="/images/ellipsis.png" alt="" />
                <div className={styles.markettops}>
                    <div className={styles.marketItem}>
                        cancel Listing
                    </div>
                    <div className={styles.marketItem}>
                        Transfer
                    </div>
                    <div className={styles.marketItem}>
                        Copy Link
                    </div>
                    <div className={styles.marketItem}>
                        Unfavorite
                    </div>
                </div>
            </div>
        </div> */}

    </div>
}
export default Market