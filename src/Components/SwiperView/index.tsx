import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCards, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'


import { useState, useRef } from 'react'
import { isBrowser } from 'react-device-detect'
import { autoWidthVW } from '@/Common'

export const SwiperView = ({
  delay = 2000,
  datas
}: {
  delay?: number,
  datas: any[]
}) => {
  // const [selectIndex,setSelectIndex] = useState(0)
  const swiperRef = useRef<any>()

  function onLeft() {
    swiperRef.current.slidePrev()
  }
  function onRight() {
    swiperRef.current.slideNext()
  }
  const pagination = {
    clickable: false,
    bulletElement: 'div',
    renderBullet: function (index: number, className: string) {
      return ''
    },
  }

  return (
    <Swiper
      initialSlide={0}
      // direction={'vertical'}
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: delay,
        disableOnInteraction: false,
      }}
      loop
      grabCursor={true}
      onSwiper={(swiper: any) => (swiperRef.current = swiper)}
      onSlideChange={(swiper: any) => {
        // setSelectIndex(swiper.activeIndex)
      }}
    // pagination={pagination}
    >
      {
        datas.map((item: any, index: number) => {
          return <SwiperSlide key={index + item}>
            <img style={{ width: '100%' }} src={`/images/${item}`} alt="" />
          </SwiperSlide>
        })
      }
    </Swiper>
  )
}
