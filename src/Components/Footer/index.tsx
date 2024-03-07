"use client"
import React, { useEffect, useState } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
export default function Footer() {
  const { t } = useTranslationLanguage()
  const IntroduceList = [
    {
      name: t('document'),
    },
    {
      name: t('report'),
    },
    {
      name: t('join'),
    },
    {
      name: t('developer'),
    },
    {
      name: t('API'),
    },
    {
      name: t('community'),
    },
    {
      name: t('PrivacyStatement'),
    },
    {
      name: t('TermService'),
    },
  ]
  const IconList = [
    {
      icon: '/images/Discord.png',
      link: 'https://discord.gg/dNDNgvCFmg'
    },
    // {
    //   icon: '/images/medium.png',
    //   link: ''
    // },
    // {
    //   icon: '/images/Facebook.png',
    //   link: ''
    // },
    {
      icon: '/images/twitter.png',
      link: 'https://twitter.com/@N2FT_'
    },
    {
      icon: '/images/telegram.png',
      link: 'https://t.me/N2FT_NFT'
    }
  ]
  return (
    <div className={styles.footer}>
      <div className={styles.footertop}>
        <div className={styles.footerImg}>
          <img src="/images/logoo.png" alt="" />
        </div>
        <div className={styles.market}>
          {t('market')}
        </div>
        <div className={styles.iconlist}>
          {IconList.map((item, index) => {
     return <div key={index} className={styles.icon} onClick={()=>{
      window.open(item.link)
    }}>
              <img src={item.icon} alt="" />
            </div>
          })}
        </div>
      </div>
      {/* <div className={styles.divider}>

      </div>
      <div className={styles.Introduce}>
        {
          IntroduceList.map((item, index) => {
            return <div key={index} className={styles.roduceItem}> {item.name} </div>
          })
        }
      </div> */}
    </div>
  )
}
function Contact({ enter, leave, link = '' }: any) {
  const [mouseIn, setMouseIn] = useState(false)
  return <div onClick={() => {
    link && window.open(link)
  }} className={styles.contact} onMouseEnter={() => {
    setMouseIn(true)
  }} onMouseLeave={() => {
    setMouseIn(false)
  }}>
  </div>
}