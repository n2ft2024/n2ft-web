import styles from './index.,module.scss'
import commonStyle from '@/Common/common.module.scss'
import { useState } from 'react'


export default function NftDesc() {
  const [tab, setTab] = useState(0)
  const tabs = ['Box Content', 'Box Introduction', 'Project Highlight']
  function clickHandler(i: number) {
    // console.log('click i===', i)
    setTab(i)
  }
  console.log('tab==', tab)
  return (
    <div className={styles.tabLine}>
      {tabs.map((tab: any, index: number) => (
        <div className={`${styles.tab} ${tab == index && styles.active}`} key={index} onClick={() => clickHandler(index)}>{tab}</div>
      ))}
    </div>
  )

}

function cont1() {
  return (
    <div>

    </div>
  )
}