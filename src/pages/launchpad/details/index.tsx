import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import Mint from './mint'
import MintSchedual from './mintSchedual'
import { useLaunchpadMintAmount } from '@/Contract'
import LoadingRow from '@/Components/LoadingRow'
import NftDesc from './nftDesc'
import { useMedia } from 'use-media'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import { useLocation } from 'umi'
export default function LaunchpadDetails() {
  const isMobile = useMedia({ maxWidth: '768px' })
  const launchpadMintAmount = useLaunchpadMintAmount()
  const {t} = useTranslationLanguage()
  const location = useLocation()
  const params: any = location.state;
  const {type}=params;
  console.log(type,'asdasdas')
  return (

    <div className={commonStyle.mainView}>
      <div className={commonStyle.mainContent}>
        {/* <img src={isMobile ? "/images/m_nft2.png" : "/images/launch_details.png"} className={styles.banner} alt="" /> */}

        <div className={styles.mainContent}>
          <div>
            <div className={styles.nft}>
              <img src={type?.img} alt="" />
              <div className={styles.status}>
                <div className={styles.statusIcon} style={{
                  background:(launchpadMintAmount.data?.mintdayID || 0) >= 28 ? '#f60303' : '#ef8339'
                }}></div>
                <span className={styles.statusWords}>
                  {(launchpadMintAmount.data?.mintdayID || 0) >= 28 ? t('Minting over') : t('Minting now')}
                </span>
              </div>
            </div>
            {/* <div className={styles.mediumInfo}>
              <div className={styles.meidumItem}>
                <div className={commonStyle.row}>
                  <img src="/images/twitter.png" alt="" className={styles.icon} />
                  <span className={styles.mediumName}>Twitter Follwer</span>
                </div>
                <span className={styles.followNum}>267.8K</span>
              </div>
              <div className={styles.meidumItem}>
                <div className={commonStyle.row}>
                  <img src="/images/discord_black.png" alt="" className={styles.icon} />
                  <span className={styles.mediumName}>Discord Member</span>
                </div>
                <span className={styles.followNum}>118.9K</span>
              </div>
            </div> */}
          </div>

          <div className={styles.nftDesc}>
            <div className={styles.infoHead}>
              <span className={styles.nftName}>{t(type?.name)} NFT</span>
              {/* <div className={commonStyle.row}>
                <img src="/images/icon_web.png" alt="" />
                <img src="/images/icon_twitter.png" alt="" />
                <img src="/images/icon_discord.png" />
                <img src="/images/icon_n.png" alt="" />
                <div className={styles.headline}></div>
                <div className={styles.coin}>
                  opBNB
                </div>
              </div> */}
            </div>
            <div className={styles.nftIntro}>
                {t('nftIntro')}
            {/* nftIntro */}
            </div>
            <div className={styles.nftIntro}>
                {t('steall desc')}
            {/* nftIntro */}
            </div>
            <div className={styles.schedule}>
              <div className={commonStyle.rowBetween}>
                <div className={commonStyle.row}>
                  <span>{t('Total Items')}</span>
                  {/* {launchpadMintAmount.isLoading ? <LoadingRow width={20} /> : <span className={styles.percent}>{launchpadMintAmount.data?.mintPre}%</span>} */}
                </div>
                <div className={commonStyle.row}>
                  {/* {launchpadMintAmount.isLoading ? <LoadingRow width={20} /> : <span className={styles.in}>{launchpadMintAmount.data?.mintAmount}</span>} */}
                  <span className={styles.total}>{launchpadMintAmount.data?.leftAmount}/{launchpadMintAmount.data?.total||'-'}</span>
                </div>
              </div>
              {/* <div className={styles.progress}>
                <div className={styles.progressIn} style={{ width: `${launchpadMintAmount.data?.mintPre || 0}%` }}></div>
              </div> */}
            </div>

            <Mint />
            {/* <MintSchedual /> */}
          </div>

        </div>

        {/* <div className={styles.line}></div> */}
        {/* <NftDesc /> */}
      </div>
    </div>

  )
}