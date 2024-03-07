import classNames from 'classnames'

import Countdown, { CountdownRenderProps, zeroPad } from 'react-countdown'
import styles from './countdown.module.scss'

interface Props {
  // setPurchase: any
  date: any
  canPurchase: boolean
  changePurchase: () => void
  // changeStartTime: Function
  // down: 1 | 2
  // setDown: any
}
function secondsToHms(time: number) {
  let hour = Math.floor(time / 3600)
  let minute = Math.floor((time % 3600) / 60)
  let second = (time % 300) % 60
  return padZero(hour) + padZero(minute) + padZero(second)
}

function padZero(num: number) {
  if (num >= 10) {
    return num + ''
  } else {
    return `0${num}`
  }
}

export default function CountDown({ date, canPurchase, changePurchase }: Props) {
  // const isReach = dayjs().isSameOrAfter(date)
  // function completeFunc() {
  //   if (down === 1) {
  //     setPurchase(true)
  //     setDown(2)
  //     changeStartTime(date.add(12, 'hour'))
  //   } else {
  //     setPurchase(false)
  //     setDown(1)
  //     changeStartTime(date.add(12, 'hour'))
  //   }
  // }
  return (
    <Countdown
      date={date.valueOf()}
      zeroPadTime={2}
      renderer={(props: CountdownRenderProps) => (
        <TimeSlice {...props}
          canPurchase={canPurchase}
        />
      )}
      onComplete={changePurchase}
    />
  )
}

type timeSlice = {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
  canPurchase: boolean
}
function TimeSlice({
  hours,
  minutes,
  seconds,
  completed,
  canPurchase,
}: timeSlice) {
  // console.log('timeSlice', canPurchase)
  return (
    <div className="flexView">
      <div className="flexView" >
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(hours)[0]}
        </div>
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(hours)[1]}
        </div>
      </div>
      <span className={styles.split}>:</span>
      <div className="flexView">
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(minutes)[0]}
        </div>
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(minutes)[1]}
        </div>
      </div>
      <span className={styles.split}>:</span>
      <div className="flexView" >
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(seconds)[0]}
        </div>
        <div
          className={classNames(
            styles.card,
            canPurchase ? styles.completed : ''
          )}>
          {zeroPad(seconds)[1]}
        </div>
      </div>
      {/* <TimePair time={zeroPad(hours)} />
      <div className={`${styles.cardWords} ${styles.colon}`}>:</div>
      <TimePair time={zeroPad(minutes)} />
      <div className={`${styles.cardWords} ${styles.colon}`}>:</div>
      <TimePair time={zeroPad(seconds)} /> */}
    </div>
  )
}

interface ITimePair {
  time: string
}
function TimePair({ time }: ITimePair) {
  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div className={`${styles.signalCard} ${styles.cardWords} ${styles.mediaQuery}`}>{time[0]}</div>
      <div className={`${styles.signalCard} ${styles.cardWords} ${styles.mediaQuery}`}>{time[1]}</div>
    </div>
  )
}

