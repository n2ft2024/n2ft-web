import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import { useRef } from 'react'
export default function MintSchedual() {
  const ref1 = useRef<HTMLDivElement>(null)
  return (
    <div className={styles.schedual}>
      <div className={styles.schedualTitle}>Mint Schedule</div>
      <div className={styles.inSchedual}>
        <div className={styles.progress}>
          <div className={styles.circle}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.schedualIntro}>
          <div className={commonStyle.row}>
            <div className={styles.sTitle}>Public Sale</div>
            <div className={styles.endSechedual}>Ended</div>
          </div>
          <div className={styles.schedualDesc}>Start in: Dec 15, 00:00 (UTC+8)</div>
          <div className={styles.schedualDesc}>Price: 0.12ETH</div>
          <div className={styles.schedualDesc}>Limit: max 1 per wallet</div>
        </div>
      </div>
      <div className={styles.inSchedual}>
        <div className={styles.progress}>
          <div className={styles.circle}></div>
        </div>
        <div className={styles.schedualIntro}>
          <div className={commonStyle.row}>
            <div className={styles.sTitle}>Whitelist</div>
            <div className={styles.sechedualing}>Ongoing</div>
          </div>
          <div className={styles.schedualDesc}>Start in: Dec 15, 00:00 (UTC+8)</div>
          <div className={styles.schedualDesc}>Price: 0.12ETH</div>
          <div className={styles.schedualDesc}>Limit: max 1 per wallet</div>
        </div>
      </div>
    </div>
  )
}