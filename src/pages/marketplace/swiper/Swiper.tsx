import React from "react"
import styles from './swiper.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import './swiper.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const list = [
    { img: '1' },
    { img: '2' },
    { img: '3' },
    { img: '4' }
]
const MarketSwiper = () => {
    const { t } = useTranslationLanguage()
    return <div className={styles.swiperbox}>
        <Swiper
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2000,
            }}
            navigation={false}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            loop={true}
        >
            {
                list.map((item, index) => {
                    return <SwiperSlide key={index}  >
                        {/* {item.img} */}
                        <img src="https://nft.gateweb3.cc/nft_admin_icon_img/BAYC.jpg?w=1500" alt="" />
                    </SwiperSlide>
                })
            }
        </Swiper>
        <div className={styles.cont}>
            <div className={styles.exploratory}>
                {t('exploratory').toUpperCase()}
            </div>
            <div className={styles.describe}>
                {t('describe')}
            </div>
            <div className={styles.buy}>
                {t('buy')}
            </div>

        </div>
    </div>
}
export default MarketSwiper