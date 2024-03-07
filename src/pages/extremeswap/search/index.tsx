import commonStyle from '@/Common/common.module.scss'
import ControlledList from '@/Components/ControlledList'
// import MarketItem from '@/Components/MarketItem'
import { useModalContext } from '@/provider/modalProvider'
import { ConfigProvider, Progress } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import classNames from 'classnames'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import _, { set } from 'lodash'
import {
  FormEventHandler,
  Fragment,
  useCallback,
  useRef,
  useState,
} from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useLocation, useSearchParams } from 'umi'
import { useAccount } from 'wagmi'
import styles from './index.module.scss'
import { useFilterIsShow } from '@/Redux/filter'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
// import './index.scss'
const dayjs = require('dayjs')
dayjs.extend(isSameOrAfter)

const nfts = [
  '/images/nft_1.png',
  '/images/nft_2.png',
  '/images/nft_3.png',
  '/images/nft_4.png',
  '/images/nft_1.png',
  '/images/nft_2.png',
  '/images/nft_3.png',
  '/images/nft_4.png',
  '/images/nft_2.png',
  '/images/nft_3.png',
]
type Signal = {
  img: string
  name: string
  col: string
}[]
const signal = [
  {
    img: '/images/signal_nft1.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft2.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft3.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft4.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft2.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft4.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft3.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
  {
    img: '/images/signal_nft4.png',
    name: 'Doodles_LLC',
    col: 'Doodles_LLC',
  },
]

const elseNfts = [
  ['/images/nft1-1.png', '/images/nft1-2.png'],
  ['/images/nft2-1.png', '/images/nft2-2.png'],
  ['/images/nft3-1.png', '/images/nft3-2.png'],
  ['/images/nft4-1.png', '/images/nft4-2.png'],
]

const moreColors = [
  { color: '#BCE6EC', num: 4 },
  { color: '#B9A9FB', num: 8 },
  { color: '#DBFF73', num: 12 },
  { color: '#BCE6EC', num: 4 },
]

const info = [
  {
    collection: 'Cute Planet',
    price: 1.0,
    avatar: '/images/avatar.png',
    author: '@tranmautritam',
  },
  {
    collection: 'UI8 all-access',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Beyond the Dream',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Beyond the Dream',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Cute Planet',
    price: 1.0,
    avatar: '/images/avatar.png',
    author: '@tranmautritam',
  },
  {
    collection: 'UI8 all-access',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Beyond the Dream',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'UI8 all-access',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Cute Planet',
    price: 1.0,
    avatar: '/images/avatar.png',
    author: '@tranmautritam',
  },
  {
    collection: 'UI8 all-access',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'UI8 all-access',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
  {
    collection: 'Beyond the Dream',
    price: 1.2,
    avatar: '/images/avatar.png',
    author: '@randomdash',
  },
]

type Collections = {
  img: string
  name: string
  desc: string
  floorPrice: number
  volume: number
  owners: number
}[]
const collections = [
  {
    img: '/images/collection_1.png',
    name: 'Sunflower Land Buds',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be… ',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
  {
    img: '/images/collection_2.png',
    name: 'LoudPunx',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be…',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
  {
    img: '/images/collection_3.png',
    name: 'Doodle #7770',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be…',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
  {
    img: '/images/collection_1.png',
    name: 'Sunflower Land Buds',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be… ',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
  {
    img: '/images/collection_2.png',
    name: 'LoudPunx',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be…',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
  {
    img: '/images/collection_3.png',
    name: 'Doodle #7770',
    desc: 'Doodles is a community-driven collectibles NFT project. The road map for Doodles is collaborative and will be…',
    floorPrice: 0.1208,
    volume: 0.1208,
    owners: 3690,
  },
]

const bySort: { type: SortBy; value: string }[] = [
  { type: 'collection', value: '按合集搜索' },
  { type: 'signal', value: '按單品搜索' },
]

function changeArr(arr: Array<string>) {
  const num = Math.ceil(arr.length / 4)
  let res = []
  for (let i = 0; i < num; i++) {
    res.push(arr.slice(i * 4, (i + 1) * 4))
  }
  return res
}

export type SortBy = 'collection' | 'signal'
const _data: DataType[] = [
  {
    key: 1,
    item: {
      img: '/images/nft_1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 2,
    item: {
      img: '/images/nft_2.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 3,
    item: {
      img: '/images/nft_3.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 4,
    item: {
      img: '/images/nft_4.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 5,
    item: {
      img: '/images/nft1-1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 6,
    item: {
      img: '/images/nft2-1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
]

const list = [
  { label: '', value: '按合集搜索' },
  { label: '', value: '按單品搜索' },
]
export default function ExtremeSwapSearch() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const text = searchParams.get('text')
  const type = searchParams.get('type') as SortBy
  const { state } = location
  // const { text, type } = state as any
  // const startTime = dayjs(new Date().setHours(12, 0, 0)).hour(12)
  const [startTime, setStartTime] = useState(dayjs(new Date().setHours(12, 0, 0)))
  const [classify, setClassify] = useState('list')
  const [sortBy, setSortBy] = useState<SortBy>(type || 'collection')
  const [value, setValue] = useState(text || '')
  const [canPurchase, setCanPurchase] = useState(dayjs().isAfter(startTime))
  const [isEnd, setIsEnd] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [down, setDown] = useState(1)
  const { t } = useTranslationLanguage()
  function getRes() {
    if (sortBy === 'collection') {
      return collections.filter((c) =>
        c.name.toUpperCase().includes(value.toUpperCase())
      )
    } else {
      return signal.filter((s) =>
        s.name.toUpperCase().includes(value.toUpperCase())
      )
    }
  }

  function changeRes(query: string) {
    let res
    if (query === 'collection') {
      res = collections.filter((c) =>
        c.name.toUpperCase().includes(value.toUpperCase())
      )
    } else {
      res = signal.filter((s) =>
        s.name.toUpperCase().includes(value.toUpperCase())
      )
    }
    setRes(res)
  }
  const [res, setRes] = useState<Signal | Collections>(getRes())


  // function setText(s: string) {
  //   setValue(s)
  // }
  const setText = useCallback((s: string) => {
    setSearchParams('')
    setValue(s)
  }, [])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    sortBy === 'collection' &&
      setRes(
        collections.filter((c) =>
          c.name.toUpperCase().includes(e.target.value.toUpperCase())
        )
      )
    sortBy === 'signal' &&
      setRes(
        signal.filter((s) =>
          s.name.toUpperCase().includes(e.target.value.toUpperCase())
        )
      )
  }
  const _handleInput = _.debounce(handleInput, 500)

  // function changeSortyBy(s: SortBy) {
  //   setSortBy(s)
  // }
  const changeSortyBy = useCallback((s: SortBy) => {
    setSortBy(s)
  }, [])

  const [list, setList] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const { address } = useAccount()
  const getList = () => { }

  interface DataType {
    key: any
    item: Item
    rarity: string
    price: number
    lastSale: number
    bestOffer: number
    owner: string
    listed: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Item',
      dataIndex: 'item',
      render: (text, record, index) => (
        <div className={styles.signalTableItem}>
          <img src={'/images/nft1-1.png'} alt="" />
          <div className={styles.wordsInfo}>
            <div className={styles.col}>{'Doodle#7770'}</div>
            <div className={styles.floorPrice}>
              <span>{t('Floor')}</span>
              <span className={styles.price}>{0.002}ETH</span>
              <img src="/images/sub_script.png" alt="" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Rarity',
      dataIndex: 'rarity',
      render: (_, record) => <span>-</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record, index) => (
        <div className={styles.signalPrice}>
          <img src="/images/eth_icon.png" alt="" />
          <span> {0.123} </span>
          <img src="/images/icon_eth.png" alt="" />
        </div>
      ),
    },
    {
      title: 'Last Sale',
      dataIndex: 'lastSale',
      render: (text, record, index) => (
        <div className={styles.signalPrice}>
          <img src="/images/eth_icon.png" alt="" />
          <span> {0.0214}</span>
        </div>
      ),
    },
    {
      title: 'Best offer',
      dataIndex: 'bestOffer',
      render: (text, record, index) => (
        <div className={styles.signalPrice}>
          <img src="/images/eth_icon.png" alt="" />
          <span> {0.02} </span>
          <img src="/images/icon_eth.png" alt="" />
        </div>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      render: (_, record) => <span>0x3b6e…662a</span>,
    },
    {
      title: 'Listed',
      dataIndex: 'listed',
      render: (_, record) => <span>2m ago</span>,
    },
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const mobileChildren = (
    <div className={commonStyle.mobileView}>
      <div>
        {(res as Signal).map((r, i) => (
          <div className={styles.signalListItem} key={i}>
            <div className={styles.itemInfo}>
              <img src={r.img} alt="" />
              <div className={styles.infoWords}>
                <div className={styles.name}>{r.name}</div>
                <div className={styles.col}>{r.col}</div>
              </div>
            </div>
            <div className={styles.priceInfo}>
              <img src="/images/eth_icon.png" alt="" />
              <span>31.8</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  const CollectionsChidren = (
    <div className={styles.collections}>
      {collections.map((r, i) => (
        <div key={i}>
          <div className={styles['collection-item']}>
            <img src={r.img} alt="" />
            <div className={styles.intro}>
              <div className={styles.name}>{r.name}</div>
              <div className={styles.desc}>{r.desc}</div>
            </div>
            <div className={styles.priceInfo}>
              <div className={styles.priceItem}>
                <div className={styles.title}>Floor</div>
                <div className={styles.number}>{r.floorPrice}</div>
              </div>
              <div className={styles.priceItem}>
                <div className={styles.title}>24h volume</div>
                <div className={styles.number}>{r.volume}</div>
              </div>
              <div className={styles.priceItem}>
                <div className={styles.title}>owners</div>
                <div className={styles.number}>{r.owners}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const countdown = () => {
    // if (isEnd) {
    //   return <div></div>
    // }
    if (down === 1) {
      return (
        <Countdown
          key={1}
          date={startTime.toDate()}
          zeroPadTime={2}
          renderer={(props) => (
            <CountdownRender {...props} canPurchase={canPurchase} />
          )}
          onComplete={() => {
            setCanPurchase(true)
            setDown(2)
            setStartTime(startTime.add(5, 'hour'))
          }}
        />
      )
    } else {
      return ((
        <Countdown
          key={2}
          date={startTime.toDate()}
          zeroPadTime={2}
          renderer={(props) => (
            <CountdownRender {...props} canPurchase={canPurchase} />
          )}
          onComplete={() => {
            setCanPurchase(false)
            setDown(1)
            setIsEnd(true)
            setStartTime((pre: any) => pre.add(1, 'day'))
          }}
        />
      ))
    }

    // return (
    //   <Countdown
    //     date={startTime.toDate()}
    //     zeroPadTime={2}
    //     renderer={(props) => (
    //       <CountdownRender {...props} canPurchase={canPurchase} />
    //     )}
    //     onComplete={compeleteFunc}
    //   />
    // )
  }

  return (
    <div className={commonStyle.mainView}>
      <div className={commonStyle.mainContent}>
        <div className={styles.container}>
          <div className={commonStyle.webView}>
            <div className="flexViewBetween">
              <div>
                <h1 className={styles.headline}>
                  {canPurchase
                    ? t('endtoday')
                    : t('opening time')}
                </h1>
                <div className={styles.tip}>
                  {canPurchase
                    ? t('Remaining')
                    : t('opened')}
                </div>
              </div>


              <>
                {countdown()}
              </>
            </div>

          </div>

          {/* <div className={styles.controlList}>
            <ControlledList
              request={getList}
              rowSelection={rowSelection}
              requestData={(_data, total) => {
                setList(_data)
                setTotal(total)
              }}
              MobileChildren={mobileChildren}
              collectionChildren={CollectionsChidren}
              recommend={true}
              columns={columns}
              customTableStyle={styles.customTable}
            >
              {data.map((item: any, index: any) => {
                return (
                  <MarketItem
                    data={item}
                    index={index + 'Quotetable'}
                    key={index}
                  />
                )
              })}

            </ControlledList>
          </div> */}


        </div>
      </div>
    </div>
  )
}

export function RecommendSwiper() {
  const [curPage, setCurPage] = useState(1)
  const sumPage = 3
  const { t } = useTranslationLanguage()
  return (

    <div className={styles.swiper}>
      <Swiper
        spaceBetween={(40 * 1800) / 1920}
        onSlideChange={(swiper) => setCurPage(swiper.activeIndex + 1)}
      >
        {changeArr(nfts).map((n, index) => (
          <SwiperSlide className={styles.recommend} key={index}>
            {n.map((c, i) => {
              return (
                <div className={styles.main} key={c + i}>
                  <img src={c} alt="" />
                  <div className={styles.sub}>
                    {elseNfts[i].map((n, j) => (
                      <img src={n} alt="" key={j + n} />
                    ))}
                    <div
                      className={styles.more}
                      style={{
                        backgroundColor: `${moreColors[i].color}`,
                      }}>
                      +{moreColors[i].num}
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.row}>
                      <div className={styles.collection}>
                        {info[i * curPage].collection}
                      </div>
                      <div className={styles.price}>{t('floorPrice')}</div>
                    </div>
                    <div className={styles.row}>
                      <div className="flexView" style={{ width: '60%', flexGrow: 0 }}>
                        <img
                          src={info[i * curPage].avatar}
                          alt=""
                          className={styles.avatar}
                        />
                        <div style={{ flex: 1 }}>{info[i * curPage].author}</div>
                      </div>
                      <div style={{ width: '35%', textAlign: 'end' }}>{info[i * curPage].price} ETH</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classNames(commonStyle.webView, styles.page)}>
        <div className="flexViewCenter">
          <Progress
            className={styles.progress}
            percent={(curPage / sumPage) * 100}
            strokeColor={'#EF8339'}
            showInfo={false}
          />
        </div>
      </div>
    </div>

  )
}

// type CollectionType = {
//   res: any[]
// }

// {value !== '' && (
//   <>
//     {res.length !== 0 ? (
//       <div
//         className={sortBy === 'collection' ? styles.collections : ''}>
//         <>
//           {sortBy === 'collection' &&
//             classify === 'grid' &&
//             res.map((r: any) => (
//               <div className={commonStyle.webView}>
//                 <div className={styles['collection-item']}>
//                   <img src={r.img} alt="" />
//                   <div className={styles.intro}>
//                     <div className={styles.name}>{r.name}</div>
//                     <div className={styles.desc}>{r.desc}</div>
//                   </div>
//                   <div className={styles.priceInfo}>
//                     <div className={styles.priceItem}>
//                       <div className={styles.title}>Floor</div>
//                       <div className={styles.number}>
//                         {r.floorPrice}
//                       </div>
//                     </div>
//                     <div className={styles.priceItem}>
//                       <div className={styles.title}>24h volume</div>
//                       <div className={styles.number}>{r.volume}</div>
//                     </div>
//                     <div className={styles.priceItem}>
//                       <div className={styles.title}>owners</div>
//                       <div className={styles.number}>{r.owners}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           {sortBy === 'signal' && classify === 'grid' && (
//             <div className={commonStyle.webView}>
//               <div className={styles.signalGrid}>
//                 {(res as Signal).map((s, i) => (
//                   <SignalGridItem s={s} i={i} />
//                 ))}
//               </div>
//             </div>
//           )}
//           {sortBy === 'signal' && classify === 'list' && (
//             <SignalTable />
//           )}
//         </>
//       </div>
//     ) : (
//       <div className={commonStyle.webView}>
//         <NotData />
//       </div>
//     )}
//   </>
// )}

interface SearchBarProps {
  value: string
  handleInput: FormEventHandler<HTMLInputElement>
  changeSortBy: (s: SortBy) => void
  setClassify: React.Dispatch<React.SetStateAction<string>>
  classify: string
  type: string
  changeRes: Function
}
function SearchBar({
  value,
  handleInput,
  changeSortBy,
  classify,
  setClassify,
  type,
  changeRes,
}: SearchBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className={styles['search-bar']}>
      <div className={styles['arrow-wrap']}>
        <img src="/images/left.png" alt="" />
      </div>
      <div className={styles.search}>
        <img
          src={
            value === '' ? '/images/search.png' : '/images/search_mobile.png'
          }
          alt=""
        />
        <input placeholder="Search" value={value} onInput={handleInput} />
      </div>
      <div
        className={styles.sort}
        onMouseOver={() => {
          if (ref.current) {
            ref.current.style.display = 'block'
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.style.display = 'none'
          }
        }}>
        <div className={styles.words}>{type}</div>
        <div className={styles['select-wrap']} ref={ref}>
          <div className={styles.selecct}>
            {bySort.map((s) => (
              <div
                key={s.type}
                className={styles['select-item']}
                onClick={() => {
                  if (ref.current) {
                    ref.current.style.display = 'none'
                  }
                  changeSortBy(s.type)
                  changeRes(s.type)
                }}>
                <span>{s.value}</span>
                <div className={styles['active-icon']}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['view-type']}>
        <img
          src={
            classify === 'list' ? '/images/list_active.png' : '/images/list.png'
          }
          onClick={() => setClassify('list')}
        />
        <div className={styles.line}></div>
        <img
          src={
            classify === 'grid' ? '/images/grid_active.png' : '/images/grid.png'
          }
          onClick={() => setClassify('grid')}
        />
      </div>
    </div>
  )
}

type CountType = {
  hours: number
  minutes: number
  seconds: number
  canPurchase: boolean
}
function CountdownRender({ hours, minutes, seconds, canPurchase }: CountType) {
  const time = [hours, minutes, seconds]
  return (
    <div className={styles.countdown}>
      {time.map((t, i) => (
        <Fragment key={i + t + Math.random() * t}>
          <div
            className={classNames(
              styles.card,
              canPurchase ? styles.complete : ''
            )}>
            {zeroPad(t)[0]}
          </div>
          <div
            className={classNames(
              styles.card,
              canPurchase ? styles.complete : ''
            )}>
            {zeroPad(t)[1]}
          </div>
          {i !== 2 && <div className={styles.split}>:</div>}
        </Fragment>
      ))}
    </div>
  )
}

interface SignalProps {
  s: any
  i: number
}
function SignalGridItem({ s, i }: SignalProps) {
  const [isHover, setIsHover] = useState(false)
  const { t } = useTranslationLanguage()
  return (
    <div
      className={styles.signalGridItem}
      key={i + s.name}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <img src={s.img} alt="" />
      <div className={styles.desc}>
        <div className={styles.name}>{s.name}</div>
        <div className={styles.collection}>{s.col}</div>
        <div className={styles.priceAndMore}>
          <div className="flexView">
            <img src="/images/bsc.png" alt="" className={styles.bsc} />
            <div className={styles.price}>0.0095</div>
          </div>
          <div className="flexView" style={{ cursor: 'pointer' }}>
            <div className={styles.details}>{t('detail')}</div>
            <img src="/images/right_b.png" alt="" className={styles.arrow} />
          </div>
        </div>
      </div>
      <div
        className={styles.footer}
        style={{ background: isHover ? '#EF8339' : '#fff' }}>
        {isHover ? (
          <>
            <div className={classNames(styles.buyNow, styles.columnCenter)}>
              {t('buynow')}
            </div>
            <div className={classNames(styles.more, styles.columnCenter)}>
              <img src="/images/ellipsis.png" alt="" />
            </div>
          </>
        ) : (
          <>
            <span className={styles.time}>{t('lastTime')}</span>
            <div className="flexView">
              <img src="/images/eth_icon.png" alt="" />
              <span className={styles.words}>0.1208</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

type Item = {
  img: string
  floorPrice: number
  col: string
}

interface DataType {
  key: any
  item: Item
  rarity: string
  price: number
  lastSale: number
  bestOffer: number
  owner: string
  listed: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Item',
    dataIndex: 'item',
    render: (text, record, index) => (
      <div className={styles.signalTableItem}>
        <img src={record.item.img} alt="" />
        <div className={styles.wordsInfo}>
          <div className={styles.col}>{record.item.col}</div>
          <div className={styles.floorPrice}>
            <span>Floor</span>
            <span className={styles.price}>{record.item.floorPrice}ETH</span>
            <img src="/images/sub_script.png" alt="" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Rarity',
    dataIndex: 'rarity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (text, record, index) => (
      <div className={styles.signalPrice}>
        <img src="/images/eth_icon.png" alt="" />
        <span> {record.price} </span>
        <img src="/images/icon_eth.png" alt="" />
      </div>
    ),
  },
  {
    title: 'Last Sale',
    dataIndex: 'lastSale',
    render: (text, record, index) => (
      <div className={styles.signalPrice}>
        <img src="/images/eth_icon.png" alt="" />
        <span> {record.lastSale}</span>
      </div>
    ),
  },
  {
    title: 'Best offer',
    dataIndex: 'bestOffer',
    render: (text, record, index) => (
      <div className={styles.signalPrice}>
        <img src="/images/eth_icon.png" alt="" />
        <span> {record.bestOffer} </span>
        <img src="/images/icon_eth.png" alt="" />
      </div>
    ),
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Listed',
    dataIndex: 'listed',
  },
]

const data: DataType[] = [
  {
    key: '1',
    item: {
      img: '/images/nft_1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 2,
    item: {
      img: '/images/nft_2.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 3,
    item: {
      img: '/images/nft_3.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 4,
    item: {
      img: '/images/nft_4.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 5,
    item: {
      img: '/images/nft1-1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
  {
    key: 6,
    item: {
      img: '/images/nft2-1.png',
      col: 'Doodle#7770',
      floorPrice: 0.002,
    },
    rarity: '-',
    price: 0.0213,
    lastSale: 0.0214,
    bestOffer: 0.02,
    owner: '0x3b6e…662a',
    listed: '2m ago',
  },
]
function SignalTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'transparent',
            borderColor: 'tarnsparent',
            headerSplitColor: 'transparent',
            headerColor: '#90949A',
          },
        },
      }}>
      <div className={commonStyle.webView}>
        <div className="customTable">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </ConfigProvider>
  )
}

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Item',
//     dataIndex: 'item',
//     render: (text, record, index) => (
//       <div className={styles.signalTableItem}>
//         <img src={record.item.img} alt="" />
//         <div className={styles.wordsInfo}>
//           <div className={styles.col}>{record.item.col}</div>
//           <div className={styles.floorPrice}>
//             <span>Floor</span>
//             <span className={styles.price}>{record.item.floorPrice}ETH</span>
//             <img src="/images/sub_script.png" alt="" />
//           </div>
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: 'Rarity',
//     dataIndex: 'rarity',
//   },
//   {
//     title: 'Price',
//     dataIndex: 'price',
//     render: (text, record, index) => (
//       <div className={styles.signalPrice}>
//         <img src="/images/eth_icon.png" alt="" />
//         <span> {record.price} </span>
//         <img src="/images/icon_eth.png" alt="" />
//       </div>
//     ),
//   },
//   {
//     title: 'Last Sale',
//     dataIndex: 'lastSale',
//     render: (text, record, index) => (
//       <div className={styles.signalPrice}>
//         <img src="/images/eth_icon.png" alt="" />
//         <span> {record.lastSale}</span>
//       </div>
//     ),
//   },
//   {
//     title: 'Best offer',
//     dataIndex: 'bestOffer',
//     render: (text, record, index) => (
//       <div className={styles.signalPrice}>
//         <img src="/images/eth_icon.png" alt="" />
//         <span> {record.bestOffer} </span>
//         <img src="/images/icon_eth.png" alt="" />
//       </div>
//     ),
//   },
//   {
//     title: 'Owner',
//     dataIndex: 'owner',
//   },
//   {
//     title: 'Listed',
//     dataIndex: 'listed',
//   },
// ]

{/* <div className={styles.result}>
            <div>
              <span className={styles.num}>{res.length}</span>
              <span>result</span>
            </div>
            <div className={commonStyle.mobileView}>
              <div className={styles.way}>
                <img
                  src={
                    classify === 'list'
                      ? '/images/list_active.png'
                      : '/images/list.png'
                  }
                  onClick={() => {
                    setClassify('list')
                  }}
                />

                <img
                  src={
                    classify === 'grid'
                      ? '/images/grid_active.png'
                      : '/images/grid.png'
                  }
                  onClick={() => {
                    setClassify('grid')
                  }}
                />
              </div>
            </div>
          </div> */}
{/* <div className={commonStyle.mobileView}>
            {res.length !== 0 ? (
              <>
                {classify === 'grid' && (
                  <div
                    className={
                      sortBy === 'collection'
                        ? styles.collections
                        : styles.signal
                    }>
                    <>
                      {sortBy === 'collection' &&
                        (res as Collections).map((r) => (
                          <div className={styles['collection-item']}>
                            <img src={r.img} alt="" />
                            <div className={styles.intro}>
                              <div className={styles.name}>{r.name}</div>
                              <div className={styles.desc}>{r.desc}</div>
                            </div>
                          </div>
                        ))}
                      {sortBy === 'signal' &&
                        (res as Signal).map((r) => (
                          <div className={styles.signalItem}>
                            <img src={r.img} alt="" />
                            <div className={styles.info}>
                              <span>{r.name}</span>
                              <span>{r.col}</span>
                            </div>
                          </div>
                        ))}
                    </>
                  </div>
                )}
                {classify === 'list' && (
                  <>
                    {sortBy === 'signal' && (
                      <div className={commonStyle.mobileView}>
                        <div>
                          {(res as Signal).map((r) => (
                            <div className={styles.signalListItem}>
                              <div className={styles.itemInfo}>
                                <img src={r.img} alt="" />
                                <div className={styles.infoWords}>
                                  <div className={styles.name}>{r.name}</div>
                                  <div className={styles.col}>{r.col}</div>
                                </div>
                              </div>
                              <div className={styles.priceInfo}>
                                <img src="/images/eth_icon.png" alt="" />
                                <span>31.8</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <NotData />
            )}
</div> */}