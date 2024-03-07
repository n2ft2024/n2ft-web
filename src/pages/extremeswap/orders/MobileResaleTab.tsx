import { useNFTInfo } from '@/Contract';
import styles from './index.module.scss'
import { Checkbox } from "antd";
import { formatBalance } from '@/Common';
import { formatUnits } from 'ethers';
import LoadingRow from '@/Components/LoadingRow';
const MobileResaleTab = (props: any) => {
  const nftInfo = useNFTInfo(props.item[1],props.item[5],props.item[2],props.sellPage)
  const { item, index } = props
  return <div key={index} className={styles.mobilesaleItem}>
      <div className={styles.mobdetail} style={{flex:2}}>
          <div className={styles.mobdetiltop}>
              <div className={styles.ItemImg}>
              <img src={nftInfo.data?.nftImg} alt="" />
              </div>
              <div className={styles.Itemtext}>
                  <div className={styles.Itemtextdesc}>Gangster Gorilla</div>
                  <div className={styles.Itemtextname}>#{item[1].toString()}</div>
              </div>
          </div>
          <div className={styles.mobdetilbot}>
              <div className={styles.mobdetilbotleft}>
                  <div className={styles.mobdetailcheck}>
                      <img src="/images/check.png" alt="" />
                  </div>
                  <div className={styles.mobdetailcheckvalue}>
                  {Number(item[5].toString()) + Number(item[7].toString()) - Number(item[2].toString())}
                  </div>
              </div>
              {/* <div className={styles.mobdetailtimer}>
                  <div className={styles.mobdetailtimericon}>
                      <img src="/images/timer.png" alt="" />
                  </div>
                  <div className={styles.mobdetailtimervalue}>
                      2023-10-02 12:00:00
                  </div>

              </div> */}
          </div>
      </div>
      <div className={styles.mobileprice} style={{flex:1}}>
          <div className={styles.mobilepriceImg}>
              <img src="/tokens/USDT.png" alt="" />
          </div>
          {!nftInfo.data?.nftBuyPriceYestody ? <LoadingRow width={20}/> : <div className={styles.mobilepricetext}>
          {formatBalance(nftInfo.data?.nftBuyPriceYestody)}
          </div>}
      </div>
      <div className={styles.mobileprice} style={{flex:1}}>
          <div className={styles.mobilepriceImg}>
              <img src="/tokens/USDT.png" alt="" />
          </div>
          {!nftInfo.data?.nftSellPriceYestody ? <LoadingRow width={20}/> : <div className={styles.mobilepricetext}>
          {formatBalance(nftInfo.data?.nftSellPriceYestody)}
          </div>}
      </div>

  </div>
}
export default MobileResaleTab
