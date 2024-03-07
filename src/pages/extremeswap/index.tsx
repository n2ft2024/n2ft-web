import commonStyles from '@/Common/common.module.scss'
import SortSelect from '@/Components/Filter/FilterSort'
import SearchInput from '@/Components/SearchInput'
import { SwiperView } from '@/Components/SwiperView'
import { useModalContext } from '@/provider/modalProvider'
import classNames from 'classnames'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { history } from 'umi'
import { useMedia } from 'use-media'
import CountDown from './CountDown'
import styles from './index.module.scss'
import ReverseNFTmodal from './modal'
import { SortBy } from './search'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import CountDownModal from '@/Components/CountDown'
import { COUNTDOWN_TIME } from '@/Common'
import Market from '../marketplace/market'
import { useExtremeSwapInfo, useNFTListInfo } from '@/Contract'
import LoadingRow from '@/Components/LoadingRow'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import { Pagination } from 'antd'

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)

const bySort = [
  { type: 'collection', value: '按合集搜索' },
  { type: 'signal', value: '按單品搜索' },
]
const rc = [
  '/images/rc_nft_1.png',
  '/images/rc_nft_2.png',
  '/images/rc_nft_3.png',
  '/images/rc_nft_4.png',
]

export default function ExtremeSwap() {
  const { t } = useTranslationLanguage()
  const modal = useModalContext()
  const [show, setShow] = useState(false)
  const [text, changeText] = useState('')
  const [type, changeType] = useState('1')
  const [rcNFT, setRcNFT] = useState(rc)
  const isMobile = useMedia({ maxWidth: '768px' })
  const [down, setDown] = useState<1 | 2>(1)
  const extremeSwapInfo = useExtremeSwapInfo()

  const setText = useCallback((t: string) => {
    changeText(t)
  }, [])
  const setType = useCallback((t: SortBy) => {
    changeType(t)
  }, [])
  // const date = dayjs().subtract(1, 'day')
  function changeNFT(i: number) {
    const clone = [...rcNFT]
    clone[0] = rcNFT[i]
    clone[i] = rcNFT[0]
    setRcNFT(clone)
  }


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


  const [canPurchase, setCanPurchase] = useState(isCanPurchase)
  // const [canPurchase, setCanPurchase] = useState(true)
  console.log('isCanPurchase===',isCanPurchase,canPurchase)
  const time = isCanPurchase ? endTime : startTime

  function changeCanPurchase(flag: boolean) {
    setCanPurchase(flag)
  }
  return (
    <div className={commonStyles.mainView}>
      <div className={commonStyles.mainContent}>
        <div className={styles.container}>
          {/* <MobileSearchBar
        text={text}
        type={type}
        setText={setText}
        setType={setType}
        jump={true}
      /> */}
          {/* <div
            className={classNames(
              commonStyles.mobileView,
              commonStyles.row,
              styles.inputSearch
            )}>
            <SearchInput
              onPressEnter={(e) => {
                history.push('/extremeswap/search', { text, type })
              }}
              onChange={setText}
            />
            <SortSelect
              onChange={(e) => {
                changeType(e)
              }}
            />
          </div> */}
          <div className={styles.content}>
            <div className={styles.left}>
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
              <div
                className={classNames(
                  styles['count-down'],
                  canPurchase ? styles.border : ''
                )}>
                {/* {canPurchase ? (
              <CountDown switchBuy={switchBuy} date={remainder} />
            ) : (
              <CountDown switchBuy={switchBuy} date={date} />
            )} */}
                {!canPurchase && (
                  <CountDown
                    // setPurchase={setCanPurchase}
                    date={time}
                    changePurchase={() => {
                      setTimeout(() => {
                        changeCanPurchase(true)
                      }, 2000);
                    }}
                    canPurchase={canPurchase}
                  // changeStartTime={changeStartTime}
                  // down={down}
                  // setDown={setDown}
                  />
                )}
                {canPurchase && (
                  <>
                    <CountDown
                      // setPurchase={setCanPurchase}
                      date={time}
                      canPurchase={canPurchase}
                      changePurchase={() => {
                        setTimeout(() => {
                          changeCanPurchase(false)
                        }, 2000);
                      }}
                    // changeStartTime={changeStartTime}
                    // down={down}
                    // setDown={setDown}
                    />
                    <div className={styles.line}></div>
                    <div className={styles.mark}>
                      <div className={styles.item}>Hours</div>
                      <div className={styles.item}>Minutes</div>
                      <div className={styles.item}>Seconds</div>
                    </div>
                  </>
                )}
              </div>
              <div
                className={classNames(
                  styles['purchase-btn'],
                  canPurchase ? (extremeSwapInfo.data?.reserveStats ? '' : styles['btn-active']) : ''
                )}
                onClick={() => {

                  if (canPurchase) {
                    if (extremeSwapInfo.data?.reserveStats) {
                    } else {
                      modal.show(<ReverseNFTmodal close={modal.hidden} onSuccess={() => {
                      }} />)
                    }
                  } else {
                    setShow(true)
                    setTimeout(() => {
                      setShow(false)
                    }, 3000)
                  }
                }} >
                {canPurchase ? (extremeSwapInfo.data?.reserveStats ? t('Already booked today') : t('Pre-order now')) : t('About to open')}
               
                <Prompt show={show} setShow={setShow} />
              </div>
            
            </div>
            <div className={styles.rightGrid}>
              <div
                className={styles.rightFirst}
              // onClick={() => !isMobile && history.push('/extremeswap/search')}
              >
                <SwiperView
                  delay={2000}
                  datas={['1-1.png', '3.png', '1-2.png']}
                />
              </div>
              <div className={styles.rightTwo}>
                <SwiperView
                  delay={2500}
                  datas={['1-4.png', '5.png']}
                />
              </div>
              <div className={styles.rightThree}>
                <SwiperView
                  delay={3000}
                  datas={['7.png', '1-3.png']}
                />
              </div>
              <div className={styles.rightFour}>
                <SwiperView
                  delay={3500}
                  datas={['1-5.png', '8.png']}
                />
              </div>
            </div>
          </div>
        </div>
        <NFTItem />
      </div>
      <CountDownModal time={COUNTDOWN_TIME} />
    </div>
  )
}

function NFTItem() {
  const pageSize = 10
  const NFTListInfo = useNFTListInfo()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataSource, setDataSource] = useState<any[]>([])
  useEffect(() => {
    if (NFTListInfo.data) {
      setDataSource(NFTListInfo.data.getNFTInfoList.slice(0, pageSize))
    }
  }, [NFTListInfo.data])

  useEffect(() => {
    if (NFTListInfo.data) {
      setDataSource(NFTListInfo.data.getNFTInfoList.slice((currentPage - 1) * pageSize, currentPage * pageSize))
    }
  }, [currentPage])


  function onChange(page: number) {
    console.log(page);
    setCurrentPage(page)
  };

  return <div>
    <div className={styles.nftView}>
      {
        NFTListInfo.isLoading ? <LoadingRow width='100%' /> : dataSource.map((item: any, index: number) => {
          return <Market key={index + 'nftItem'} item={item} />
        })
      }
    </div>
    <div className={`${commonStyles.rowEnd} ${styles.pagination}`}>
      {
        NFTListInfo.isLoading ? <div /> : <Pagination
          onChange={onChange}
          pageSize={pageSize}
          current={currentPage}
          defaultPageSize={pageSize}
          total={NFTListInfo.data?.getNFTInfoList.length}
          simple />
      }
    </div>
  </div>
}

interface PromptProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

function Prompt({ show, setShow }: PromptProps) {
  const { t } = useTranslationLanguage()
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      {show && (
        <div className={commonStyles.mobileView}>
          <div className={styles.prompt}>
            <img src="/images/warn.png" alt="" />
            <span>{t('Not open')}</span>
          </div>
        </div>
      )}
    </>
  )
}
type searchBarProps = {
  text: string
  type: string
  setText: (t: string) => void
  setType: (t: SortBy) => void
  jump: boolean
  handleInput?: FormEventHandler<HTMLInputElement>
  changeRes?: Function
}
export const MobileSearchBar = memo(function MobileSearchBar({
  text = '',
  type = 'collection',
  setText,
  setType,
  jump,
  handleInput,
  changeRes,
}: searchBarProps) {
  const [isFocus, setIsFocus] = useState(false)
  // const [type, setType] = useState<string>(kinds)
  const typeWords = bySort.find((b) => b.type === type)?.value as string
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // const [text, setText] = useState(txt)
  return (
    <div className={commonStyles.mobileView}>
      <div className={styles.bar}>
        <div
          className={styles.mobileSearch}
          style={{ borderColor: isFocus ? '#ef8339' : '#e5e5e5' }}>
          <img
            src={isFocus ? '/images/search_mobile.png' : '/images/search.png'}
            alt=""
          />
          <form
            action=""
            style={{ padding: 0, flex: 1 }}
            onSubmit={(e) => {
              e.preventDefault()
              // console.log('submit')
              // jump &&
              //   history.push(`/extremeSwap/search?text=${text}&type=${type}`)
            }}>
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              ref={inputRef}
              value={text}
              // autoFocus
              onInput={jump ? (e: any) => setText(e.target.value) : handleInput}
            />
          </form>
        </div>
        <button
          className={styles.classify}
          onMouseOver={() => {
            if (ref.current) {
              ref.current.style.display = 'block'
              if (inputRef.current) {
                inputRef.current.blur()
              }
            }
          }}
          onMouseLeave={() => {
            if (ref.current) {
              ref.current.style.display = 'none'
            }
          }}>
          <img src="/images/icon_sort_active.png" alt="" />
          <span>{typeWords}</span>
          <div className={styles.selectWrap} ref={ref}>
            <div className={styles.select}>
              {bySort.map((b) => (
                <div
                  className={styles.selItem}
                  key={b.type}
                  onClick={() => {
                    setType && setType(b.type as SortBy)
                    changeRes && changeRes(b.type)
                    if (ref.current) {
                      ref.current.style.display = 'none'
                    }
                  }}>
                  <span>{b.value}</span>
                  <div className={styles.dot}></div>
                </div>
              ))}
            </div>
          </div>
        </button>
      </div>
    </div>
  )
})
