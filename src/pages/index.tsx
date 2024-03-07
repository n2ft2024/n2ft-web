import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import './index.less'

import styles from './index.module.scss'
import { message } from 'antd';
import { history } from 'umi'
export default function HomePage() {
  const { t, language } = useTranslationLanguage()
  const partnersList = [
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    },
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    },
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    },
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    },
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    }, {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    }
    , {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    },
    {
      icon: '/images/Discord.png',
      name: 'CryptoSlate'
    }
  ]

  console.log(language,'language')

  return (<div className={styles.home}>
    {/* 第一个模块 */}
    <div className={styles.title}>
      <div className={styles.tittext}>
        <div className={styles.liquid}>
          {t('liquid').toUpperCase()}
        </div>
        <div className={styles.aggregated}>
          {t('aggregated').toUpperCase()}
        </div>
        <div className={styles.pre} onClick={() => {
          history.push('/presale')
        }}>
          {t('MEMBER NFT STORE').toUpperCase()}
        </div>
        <div className={styles.launch} onClick={() => {
         history.push('/extremeSwap')
        }}>
     {t('ExtremeSwap')}
        </div>
      </div>
      <div className={styles.nft}>
        <img src="/images/N2FT01.gif" alt="" />
      </div>
      <div className={styles.mobilen2}>
        <img src="/images/N2FT01.gif" alt="" />
      </div>
    </div>
    <div className={styles.presale}  onClick={() => {
        history.push('/presale')
        }}>
    {t('MEMBER NFT STORE').toUpperCase()}
    </div>
    <div className={styles.mobilelaunch}  onClick={() => {
      history.push('/extremeSwap')
        }}>
 {t('ExtremeSwap')}
    </div>
    {/*  第二个模块 */}
    <div className={styles.mob}>
      <div className={styles.mobtitle}>
        <span className={styles.mobilized}>{t('Mobilized').toUpperCase()}</span>
        <span className={styles.platform}>{t('platform').toUpperCase()}</span>
      </div>
      <div className={styles.mobiletext}
      style={{lineHeight:language=="zh-CN"?'26px':'19px'}}
     >
        {t('mobile')}
      </div>
      <div className={styles.moilebg}>
        <div className={styles.moilecot}>
          <div className={styles.mobleleft}>
            {t('mobile')}
          </div>
          <div className={styles.mobileright}>
            <img src="/images/N2FT02.gif" alt="" />
          </div>
        </div>
      </div>
    </div>
    {/* 第三个模块 */}
    <div className={styles.paradigm}>
      <div className={styles.paradigmbox}>
        <div className={styles.cube}>
          <img src="/images/cube.png" alt="" />
        </div>
        <div className={styles.paradigmright}>
          <div className={styles.paradigmtitle}>
            <span className={styles.paradigmtext}>{t('paradigm').toUpperCase()}</span>
            <span className={styles.paradigmon}>{t('ift').toUpperCase()}</span>
          </div>
          <div className={styles.paradigmcont}>
            {t('protocol')}
          </div>
        </div>
      </div>
    </div>
    {/* 移动端第三个模块 */}
    <div className={styles.mobileparadigm}>
      <div className={styles.mobileparadigmtitle}>
        <span className={styles.mobileparadigmtext}>{t('paradigm').toUpperCase()}</span>
        <span className={styles.mobileparadigmon}>{t('ift').toUpperCase()}</span>
      </div>
      <div className={styles.mobileparadigmcont}
       style={{lineHeight:language=="zh-CN"?'25px':'18px'}}>
        {t('protocol')}
      </div>
      <div className={styles.cube}>
        <img src="/images/cube.png" alt="" />
      </div>
    </div>
    {/* 第四个模块 */}
    <div className={styles.borrows}>
      <div className={styles.borrowscont}>
        <div className={styles.borrowleft}>
          {t('borrow')}
        </div>
        <div className={styles.borrowright}>
          <div className={styles.brouwertitle}>
            <span className={styles.lets}>{t('lets')}</span>
            <span className={styles.fi}>{t('fi')}</span>
          </div>
          <div className={styles.loan}>
            <img src="/images/loan.png" alt="" />
          </div>
        </div>
      </div>

    </div>

    {/* 移动端第四个模块 */}
    <div className={styles.moileborrows}>
      <div className={styles.moilebrouwertitle}>
        <span className={styles.moilelets}>{t('lets')}</span>
        <span className={styles.moilefi}>{t('fi')}</span>
      </div>
      <div className={styles.moileborrowtext}
          style={{lineHeight:language=="zh-CN"?'25px':'18px'}}>
        {t('borrow')}
      </div>
      <div className={styles.loan}>
        <img src="/images/loan.png" alt="" />
      </div>
    </div>



    {/*  第五个模块 */}
    <div className={styles.soliauto}>
      <div className={styles.solia}>
        <img src="/images/N2FT03.gif" alt="" />
      </div>
      <div className={styles.soliatitle}>
        {t('soclalize')}
      </div>
    </div>

    {/*  第五个模块移动端 */}
    <div className={styles.mobilesolies}>
      <div className={styles.mobilesoliatitle}>
        {t('soclalize')}
      </div>
      <div className={styles.mobilesolia}>
        <div className={styles.mobilesoliacont}>
          <img src="/images/N2FT03.gif" alt="" />
        </div>
      </div>
    </div>

    {/* 第六个模块 */}
    {/* <div className={styles.partners}>
      <div className={styles.partnerstitle}>
        {t('partners').toLocaleUpperCase()}
      </div>
      <div className={styles.partnerscont}>
        {partnersList.map((item, index) => {
          return <div key={index} className={styles.partnersItem}>
            <div className={styles.partnersicon}><img src={item.icon} alt="" /></div>
            <div className={styles.partnerstext}> {item.name} </div>
          </div>
        })}
      </div>
    </div> */}
  </div>
  );
}
