
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import commonStyle from '@/Common/common.module.scss'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import styles from './index.module.scss'
import { useMedia } from "use-media";
import { history } from "umi";
import { COUNTDOWN_TIME } from "@/Common";
import CountDownModal from "@/Components/CountDown";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { message } from "antd";
import { useLaunchpadMintAmount } from "@/Contract";
const Launchpad = () => {
    const isMobile = useMedia({ maxWidth: '768px' })
    const { t } = useTranslationLanguage()
    const launchpadMintAmount = useLaunchpadMintAmount()
    const list = [
        { img: '/images/gorll.png',  name: "gorll" },
        { img: '/images/GorillaNFT.png', name: 'generation elder' },
    ]
    return <div className={commonStyle.mainView}>
        <div className={styles.mainContent}>
            <Swiper
                style={{ width: '100%' }}
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop
            >
                <SwiperSlide className={styles.slider}>
                    <img src={isMobile ? "/images/m_nft1.png" : "/images/lanuch_nft.png"} />
                    {/* <div className={styles.nftInfo}>
                        <div className={styles.title}>Gorilla World NFT</div>
                        <div className={`${styles.price} ${commonStyle.row}`}>
                            <div className={styles.label}>Price</div>
                            <div className={styles.num}>0.01 ETH</div>
                        </div>
                        <div className={styles.mintBtn}>
                            <div className={styles.sign}></div>
                            <div className={styles.btnWords}>Minting now</div>
                        </div>
                    </div>
                    <div className={styles.socialMedium}>
                        <div className={commonStyle.row}>
                            <img src="/images/icon_web.png" alt="" />
                        </div>
                        <div className={styles.line}></div>
                        <div className={commonStyle.row}>
                            <img src="/images/icon_twitter.png" alt="" />
                            <span>28.9K</span>
                        </div>
                        <div className={styles.line}></div>
                        <div className={commonStyle.row}>
                            <img src="/images/icon_discord.png" alt="" />
                            <span>14.6K</span>
                        </div>
                    </div> */}

                </SwiperSlide>

            </Swiper>
        </div>
        <div className={`${commonStyle.mainContent} ${styles.content}`}>
            <div className={styles.past}>
                <div className={styles.title}>{t('Past Events')}</div>
            </div>

            <div className={styles.collections}>
                {list.map((item: any, index: number) => (
                    <div className={styles.colItem} key={index} onClick={() => {
                        if ((launchpadMintAmount.data?.mintdayID || 0) >= 28) {
                            message.warning(t('Casting paused'))
                            return
                        } else {
                            history.push('/launchpad/details', { type: item })

                        }
                    }}>
                        <img className={styles.nftImg} src={item?.img} alt="" />

                        <div className={styles.status}>
                            <div className={styles.statusIcon} style={{
                                background:(launchpadMintAmount.data?.mintdayID || 0) >= 28 ? '#f60303' : '#ef8339'
                            }}></div>
                            <span className={styles.statusWords}>
                                {(launchpadMintAmount.data?.mintdayID || 0) >= 28? t('Minting over') : t('Minting now')}
                            </span>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.colName}>{t(item?.name)}</div>
                            <div className={commonStyle.row}>
                                {/* <div className={styles.colInfo}>
                                    <div className={styles.colLabel}>Start</div>
                                    <div className={styles.colNum}>Dec 15th</div>
                                </div> */}
                                <div className={styles.colInfo}>
                                    <div className={styles.colLabel}>{t('unit price')}</div>
                                    <div className={styles.colNum}>100 USDT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <CountDownModal time={COUNTDOWN_TIME} />
    </div>
}
export default Launchpad