import styles from './styles.module.scss'
import commonStyles from '../../Common/common.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useContext, useReducer, useState } from 'react';
import TradeProvider, { TradeContentProps, TrandeContext } from './tradeProvider';


export default function Trade() {
  return (
    <TradeProvider>
      <div className={`${commonStyles.mainView}`}>
        <div className={`${commonStyles.mainContent} ${styles.topView}`}>
          <div className={commonStyles.rowBetween} style={{alignItems:'flex-start'}}>
            <LeftView/>
            <RightView/>
          </div>
        </div>
      </div>
    </TradeProvider>
  );
}
function LeftView(){
  const {t} = useTranslationLanguage()
  function onChooseCoin(){

  }
  return  <div className={`${commonStyles.row} ${styles.leftView}`}>
    <div className={`${commonStyles.row} ${styles.topLeftView}`}>
      <span className={styles.coinTitle} onClick={onChooseCoin}>ARB/USD</span>
      <img className={styles.arrowicon} src='/images/arr_down.png'/>
      <div className={styles.topLineV}/>
      <div className={commonStyles.columnCenter}>
        <span className={styles.coinPrice}>$0.231</span>
        <span className={styles.coinPriceDes}>$0.231</span>
      </div>
      <div className={styles.coinPriceSpace}/>
      <div className={commonStyles.columnCenter}>
        <span className={styles.coinPriceDes}>{t('24h change')}</span>
        <span className={styles.coinPriceadd}>+3.14%</span>
      </div>
      <div className={styles.coinPriceSpace}/>
      <div className={commonStyles.columnCenter}>
        <span className={styles.coinPriceDes}>{t('24h high')}</span>
        <span className={styles.coinPrice}>0.932</span>
      </div>
      <div className={styles.coinPriceSpace}/>
      <div className={commonStyles.columnCenter}>
        <span className={styles.coinPriceDes}>{t('24h low')}</span>
        <span className={styles.coinPrice}>0.213</span>
      </div>
    </div>
    <SelectLevel/>
  </div>
}



function SelectLevel(){
  const context = useContext(TrandeContext) as TradeContentProps;
  return <div className={`${commonStyles.rowCenter} ${styles.toprightView}`}>
    <div className={`${commonStyles.rowCenter} ${styles.toprightViewV} ${context.level == 1 && styles.toprightViewVSel}`} onClick={()=>{
      context.dispatchLevel(1)
    }}>V1</div>
    <div className={`${commonStyles.rowCenter} ${styles.toprightViewV} ${context.level == 2 && styles.toprightViewVSel}`} onClick={()=>{
      context.dispatchLevel(2)
    }}>V2</div>
  </div>
}
function RightView(){
  const context = useContext(TrandeContext) as TradeContentProps;
  console.log('RightView context==',context.level)

  return <div className={styles.rightView}>
    <div className={styles.rightTopView}>
      {context.level}
    </div>
  </div>
}
export async function clientLoader() {
  const data = await fetch('/api/data');
  return data;
}