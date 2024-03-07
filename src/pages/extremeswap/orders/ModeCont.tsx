import { useNFTListInfo, useUserRewardInfo } from '@/Contract'
import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import styles from './index.module.scss'
import commonStyle from '@/Common/common.module.scss'
import LoadingRow from '@/Components/LoadingRow'
const ModeCont = (() => {
  const userRewardInfo = useUserRewardInfo()
  const NFTListInfo = useNFTListInfo()
  const {t} = useTranslationLanguage()
    return <div>
        {/* <div className={`${commonStyle.rowBetween} ${styles.modeItem}`}>
            <div className={styles.modeItemlabel}>{t('Number of NFT pre-orders today')} </div>
            <div className={styles.modeItemValue}>  244,542</div>
        </div> */}
        <div className={`${commonStyle.rowBetween} ${styles.modeItem}`}>
            <div className={styles.modeItemlabel}>{t('Number of NFT pre-orders today')}:</div>
            {userRewardInfo.isLoading ? <LoadingRow width={20}/> : <div className={styles.modeItemValue}>{userRewardInfo.data?.reserveAmount}</div>}
        </div>
        <div className={`${commonStyle.rowBetween} ${styles.modeItem}`}>
        <div className={styles.modeItemlabel}>{t('resale NFTs yesterday')}:</div>
            {NFTListInfo.isLoading ? <LoadingRow width={20}/> : <div className={styles.modeItemValue}>{NFTListInfo.data?.totalNFTAmount}</div>}
        </div>
        <div className={`${commonStyle.rowBetween} ${styles.modeItem}`}>
        <div className={styles.modeItemlabel}>{t('Number of NFTs resold today')}:</div>
            {NFTListInfo.isLoading ? <LoadingRow width={20}/> : <div className={styles.modeItemValue}>{NFTListInfo.data?.todayNFTList?.length}</div>}
        </div>
    </div>
})
export default ModeCont