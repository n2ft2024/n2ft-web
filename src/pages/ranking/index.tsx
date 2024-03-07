import styles from './index.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import useMedia from 'use-media'
import classNames from 'classnames'
import React,{useContext, useState, useRef, useEffect} from 'react'
import { isMobile } from 'react-device-detect'
import '@/Common/common.scss'
import Empty from '@/Components/Empty'
import useTranslationLanguage from '@/hooks/useTranslationLanguage';


const imgs = [
  '/images/ranking_banner1.png',
  '/images/ranking_banner2.png',
  '/images/ranking_banner3.png',
  '/images/ranking_banner1.png',
  '/images/ranking_banner2.png',
  '/images/ranking_banner3.png',
]

const timeSelection = ['15m', '1h', '3h', '12h', '1d', '3d', '7d', 'ALL']
const mTimeSelection = [{name: '5m'}, {name: '15m'}, {name: '30m'}, {name: '1h'}, {name: '6h'}, {name: '12h'}, {name: '1d'}]
const chains = [
  {
    img: '/images/chain_select.png',
    name: 'All Chains'
  },
  {
    img: '/images/BTC.png',
    name: 'Bitcoin'
  },
  {
    img: '/images/eth_chain.png',
    name: 'Ethereum'
  },
  {
    img: '/images/BNB.png',
    name: 'BNB Chain'
  },
  {
    img: '/images/Polygon.png',
    name: 'Polygon'
  },
  {
    img: '/images/Avalanche.png',
    name: 'Avalanche'
  },
  {
    img: '/images/Arbitrum.png',
    name: 'Arbitrum'
  }
]

export default function Ranking() {
  const isMobile = useMedia({maxWidth: '768px'})
  const [rankingWay, setRankingWay] = useState('trending') 
  const [timeSelected, setTimeSelected] = useState(0)
  const [mTimeSelected, setMTimeSelected] = useState(0)
  const [chainsSelected, setChainsSelected] = useState(0)
  const [selectedType, setSelectedType] = useState('')
  
  const {t} = useTranslationLanguage()
  function chooseSel(type: string) {
    if (selectedType === type) {
      setSelectedType('')
    } else {
      setSelectedType(type)
    }
  }
 
  return(
    <div className={styles.container}>
      <Swiper
        spaceBetween={20}
        slidesPerView={isMobile ? 1 : 2.7}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        // slidesOffsetAfter={10}
        slidesOffsetBefore={isMobile ? 0 : -100}
        slidesOffsetAfter={isMobile ? 0 : -100}
        modules={[Autoplay]}
        loop = {true}
        loopedSlides={3}
        autoplay = {{
          pauseOnMouseEnter: true,
          delay: 2000,
          disableOnInteraction: false
        }}
        style={{overflow: 'hidden'}}
      >
        {
          imgs.map((img, i) => (
            <SwiperSlide key={img + i}>
              <img src={img} alt="" className={styles['swiper-banner']} />
            </SwiperSlide>
          ))
        }
   
      </Swiper>
      <div className={styles.content}>
        <div className={styles.headline}>{t('realTimeDataTrack')}</div>
        <div className={styles['sub-headline']}>
         {t('dataIntro')}
        </div>

        <div className={styles.nav}>
          <div className={styles['ranking-way']}>
            <div 
              className={classNames(styles['trending-way'], rankingWay === 'trending' ? styles.choose : '')}
              onClick={() => rankingWay !== 'trending' && setRankingWay('trending')}
            >
              <img src={rankingWay === 'trending' ? '/images/icon_trending_active.png':'/images/icon_trending.png'} alt="" />
              {t('trending')}
            </div>
            <div 
              className={classNames(styles['top-way'], rankingWay === 'top' ? styles.choose : '')}
              onClick={() => rankingWay !== 'top' && setRankingWay('top')}
            >
              <img src={rankingWay === 'top' ? '/images/icon_top_active.png':'/images/icon_top.png'} alt="" />
              {t('top')}
            </div>
          </div>
          <div className={styles['select-opt']}>
            {!isMobile &&   
              <div 
                className={classNames(styles['select-wrapper'], styles.categories, selectedType === 'categories' ? styles['select-active'] : '')} 
                onClick={() => chooseSel('all')}
              >
                <span>{t('allCategories')}</span>
                <img src="/images/down.png" alt="" />
              </div> 
            }
          
            {/* <div 
              className={classNames(styles['select-wrapper'], styles.chains, selectedType === 'chain' ? styles['select-active'] : '')} 
              onClick={() => chooseSel('chain')}
            >
              <div className='flexView'>
                <img src={chains[chainsSelected]?.img || "/images/chain_select.png" } alt="" style={{marginRight: 8}} />
                <span>{chains[chainsSelected]?.name || 'All Chains'}</span>
                {selectedType === 'chain' && <div className={styles['chains-select']}>
                  {chains.map((c, i) => (
                    <div 
                      className={classNames(styles['chains-item'], chainsSelected === i ? styles['item-selected'] : '')} 
                      key={c.name} 
                      onClick={(e) => {
                        e.stopPropagation()
                        setChainsSelected(i)
                      }}
                    >
                      <div className={styles['chains-desc']}>
                        <img src={c.img} alt="" />
                        <span>{c.name}</span>
                      </div>
                      {chainsSelected === i && <div className={styles['chains-selected']}></div>}
                    </div>
                  ))}
                </div>}
                
              </div>   
              <img src="/images/down.png" alt="" />
            </div> */}

            <Select 
              selectedType={selectedType} 
              chooseSel={chooseSel}
              selected={chainsSelected}
              setSelected={setChainsSelected}
              data={chains}
              type='chain'
              defaultIocn="/images/chain_select.png"
             />

          

            {!isMobile && (
              <div className={styles['time-select']}>
                {timeSelection.map((t, i) => (
                  <div className={classNames(styles['time-item'], timeSelected === i ? styles['time-selected']: '')} key={t} onClick={() => setTimeSelected(i)}>{t}</div>
                ))}
              </div>
            )}

            {isMobile && (
              <div 
                className={classNames(styles['m-time-select'])}
                onClick={() => chooseSel('time')}
            >
              {/* <div className={classNames(styles['select-wrapper'], selectedType === 'time' ? styles['select-active'] : '')}>
                <span>{mTimeSelection[timeSelected]}</span>
                <img src="/images/down.png" alt="" />
                {selectedType === 'time' && (
                  <div className={styles['m-time-sel']} >
                    {mTimeSelection.map((t, i) => (
                      <div 
                        className={classNames(styles['time-item'],timeSelected === i ? styles['time-choosed'] : '')} 
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation()
                          setTimeSelected(i)
                        }}
                      >
                        <span>{t}</span>
                        {timeSelected === i && <div className={styles['time-selected']}></div>}
                      </div>
                    ))}
                  </div>
                )}
               
              </div> */}
              <Select
                selectedType={selectedType}
                chooseSel={chooseSel}
                selected={mTimeSelected}
                setSelected={setMTimeSelected}
                type='time'
                data={mTimeSelection}
               />
             
            </div>
           )}
          </div>   
            
        </div>    
        {!isMobile ? <RankingTable /> : <MRankingTable /> } 
      </div>  
    </div>
  )
}


const sortIconIndex = [1, 2, 3, 4, 6, 8]
const weekDate = [100,100,500,800,400,200,300]
const tableItems = [
  {
    collection: {
      img: '/images/table_nft.png',
      info: 'Doodle#7770'
    },
    price: {
      img: '/images/eth1.png', info: '0.0213'
    },
    oneDay: {
      info: '-'
    },
    volume: {
      img: 'images/eth1.png', info: '30'
    },
    oneDay2: {
      info: '-'
    },
    sales: {
      info: '1,128'
    },
    buyers: {info: '359'},
    listed: {info: '22%'},
    items: {info: '879'},
    sevenDayVol: {data: weekDate}
  },
  {
    collection: {
      img: '/images/table_nft.png',
      info: 'Doodle#7770'
    },
    price: {
      img: '/images/eth1.png', info: '0.0213'
    },
    oneDay: {
      info: '-'
    },
    volume: {
      img: 'images/eth1.png', info: '30'
    },
    oneDay2: {
      info: '-'
    },
    sales: {
      info: '1,128'
    },
    buyers: {info: '359'},
    listed: {info: '22%'},
    items: {info: '879'},
    sevenDayVol: {data: weekDate}
  },

]

const mTableItems = [
  {
    avatar: '/images/m_nft_1.png',
    name: 'Deadmigos',
    trend: '+49%'
  },
  {
    avatar: '/images/m_nft_2.png',
    name: 'Deadmigos',
    trend: '-5%'
  },
  {
    avatar: '/images/m_nft_3.png',
    name: 'Deadmigos',
    trend: '+82%'
  },
  {
    avatar: '/images/m_nft_4.png',
    name: 'Deadmigos',
    trend: '+24%'
  },
  {
    avatar: '/images/m_nft_5.png',
    name: 'Deadmigos',
    trend: '+542%'
  },
]




function RankingTable() {
  const {t} = useTranslationLanguage()
  const tableHeaders = [t('collection'), t('floorPrice'), t('oneDayPercent'), t('volume'), t('oneDayPercent'), t('sales'), t('buyers'), t('listed '), t('items'), t('sevenDayVol')]
  return(
    <div className={styles['ranking-table']}>
      <div className={styles['table-header']}>
      {tableHeaders.map((t, i) => (
        <div key={t + i} className={styles['header-item']}>
          <span>{t}</span>
          {sortIconIndex.includes(i) && (
            <div className='flexViewCol'>
              <img src="/images/sort_up.png" alt="" className={styles['sort-icon']} />
              <img src="/images/sort_down.png" alt="" style={{marginTop: 2}} className={styles['sort-icon']} />
            </div>
          )}
          {i === 5 && <img src='/images/down.png' width={16} className={styles['sort-icon-else']} />}
        </div>
      ))}
      </div>
     
  
      
     {tableItems.length !== 0 ? tableItems.map((t, i) => (
      <div className={styles['table-item']} key={i + t.collection.info}>    
        <div className={styles.item}>
          <div>
            <span className={styles.order}>{ i + 1 }</span>
            <img src={t.collection.img} />
            <span>{t.collection.info}</span>
          </div>   
        </div>
        <div className={styles['item']}>
          <img src={t.price.img} alt="" />
          <span>{t.price.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.oneDay.info}</span>
        </div>
        <div className={styles['item']}>
          <img src={t.volume.img} alt="" />
          <span>{t.volume.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.oneDay2.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.sales.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.buyers.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.listed.info}</span>
        </div>
        <div className={styles['item']}>
          <span>{t.items.info}</span>
        </div>
        <div className={styles['item']}>
          <WeekData data={weekDate} />
        </div>
         
      </div>
     )): <Empty />}
     </div>
     

  )
}

type weekData = {
  data: number[]
}
function WeekData({data}: weekData) {
  const sum = data.reduce((pre,cur) => pre + cur, 0)
  return (
    <div className={styles['week-data-wrap']}>
      {data.map((d: any, i) => (
        <div className={styles['data-item']} key={i} style={{height: `${d / sum * 50}px`}}></div>
      ))}
    </div>
  )
}

function MRankingTable() {
  return(
    <div className={styles['m-table-wrapper']}>
      {mTableItems.length !== 0 ? mTableItems.map((t, i) => (
         <div className={styles['m-table-item']} key={t.name + i}>
         <div className={styles.left}>
           <div className={styles.order}>{i + 1}</div>
           <img src={t.avatar} className={styles.avatar} />
           <div className={styles['left-info']}>
             <div className={styles.name}>{t.name}</div>
             <div className={styles.floor}>
               <span>Floor</span>
               <img src="/images/eth1.png" alt="" />
               <span>0.009</span>
             </div>
           </div>
         </div>
         <div className={styles.right}>
           <div>
             <img src="/images/eth1.png" alt="" />
             <span className={styles.num}>31.8</span>
           </div>
           <div className={styles.trend}>
             <span className={parseFloat(t.trend) > 0 ? styles.increase : styles.decrease}>{t.trend}</span>
           </div>
         </div>
       </div>
      )): <Empty />}
     
    </div>
  )
}

type SelectData = {name: string, img?: string}[]
type SelectProps = {
  selectedType: string
  chooseSel: (c: string) => void
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number>>,
  data: SelectData
  type: string
  defaultIocn?: string
}

function Select({selectedType, chooseSel, selected, setSelected, data, type, defaultIocn}: SelectProps) {
  
  const ref = useRef<HTMLDivElement>(null)


  return (
    <div 
    className={classNames(styles['select-wrapper'], type === 'chain' && styles.chains , selectedType === type ? styles['select-active'] : '')} 
    onClick={() => chooseSel(type)}
    onMouseOver={(e) => {
      if (ref.current) {
        ref.current.style.display = 'block'
      }
     
    }}
    onMouseLeave={() => {
      if (ref.current) {
        ref.current.style.display = 'none'
      }
    }}
    >
      <div className='flexView'>
        {type === 'chain' && <img src={data[selected]?.img || defaultIocn } alt="" style={{marginRight: 8}} />}
        <span>{data[selected]?.name}</span>
        {<div className={classNames(type === 'chain' ? styles['chains-select'] : styles['m-time-sel'], styles['select-content'])} ref={ref}>
        <div className={styles['chains-content']}>
          {data.map((c, i) => {
            if (type === 'chain') {
              return (
                  <div 
                    className={classNames(styles['chains-item'])} 
                    key={c.name} 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(i)
                      if (ref.current) {
                        ref.current.style.display = 'none'
                      }
                    }}
                  >
                    <div className={styles['chains-desc']}>
                      <img src={c.img} alt="" />
                      <span>{c.name}</span>
                    </div>
                    {/* {selected === i && <div className={styles['chains-selected']}></div>} */}
                  </div>
              
              )
            } else {
              return (
                // <div className={styles['m-time-sel']} >
                // {mTimeSelection.map((t, i) => (
                  <div 
                    className={classNames(styles['time-item'])} 
                    key={c.name}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelected(i)
                      if (ref.current) {
                        ref.current.style.display = 'none'
                      }
                    }}
                  >
                    <span>{c.name}</span>
                    {/* {selected === i && <div className={styles['time-selected']}></div>} */}
                  </div>
              //   ))}
              // </div>
              )
            }
          }
           
          )}
        </div>
        </div>
        }
      
      </div>   
      <img src="/images/down.png" alt="" />
    </div>
  )
}

