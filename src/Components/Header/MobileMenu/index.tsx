import React, { useState } from "react";
import { Languages, pages } from "../utils";
import { getLocale, history, setLocale, useLocation } from 'umi';
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { message } from "antd";
interface MobileMenuface {
    onChange: Function;
}
const MobileMenu = (props: MobileMenuface) => {
    const { onChange } = props;
    const navData = pages()
    const location = useLocation()
    const { open } = useWeb3Modal()
    const [currentMenuIndex, setCurrentMenuIndex] = useState<any>(null);
    const { t } = useTranslationLanguage()
    const parentH5NavItem: any = () => {
        return navData.map((navItem, index: number) => {
            // console.log(navItem, 'navItem')
            if (navItem?.children && navItem.children.length) {
                return subH5Nav(navItem, index);
            }
            return <div className={styles.mobilenavname}
                key={index}
                style={{ color: location.pathname === navItem.link ? '#EF8339' : ((navItem?.able || !navItem?.file )  ? '#000000' : '#90949A')

            }}
                onClick={() => {
                    if (navItem.able) {
                        history.push(navItem.link)
                        onChange()
                        setCurrentMenuIndex(null)
                    } else {
                        message.warning(t('comming soon~'))
                    }
                }}>{navItem.name} 
                <span>
                {navItem?.able&&navItem?.file &&<img  src="/images/fire.gif" style={{width:'20px',height:'20px',display:'flex'}}/>}
                </span>
                </div>
        })

    }

    const subH5Nav = (navItem: any, id: number) => {
        const navItemEle = navItem?.children?.map((item: any, index: number) => {
            return (
                <div key={index} onClick={() => {
                    onChange()
                    setCurrentMenuIndex(null)
                    history.push(item.link)
                }}
                    style={{ color: item.link === location.pathname ? '#EF8339' : '' }}
                    className={styles.mobilenavtext}>
                    {item.name}
                </div>
            );
        })
        const ele = (
            <div key={id} className={styles.elebox}>
                <div className={styles.mobilenavItem} style={{
                }}
                    onClick={() => {
                        setCurrentMenuIndex(id === currentMenuIndex ? null : id);
                    }}>
                    <div className={styles.mobilename}
                        style={{ color: navItem?.children?.some((child: any) => child.link === location.pathname) ? '#EF8339' : '', }}>
                        {navItem.name}
                        <span>
                        {navItem?.able&&navItem?.file  && <img src="/images/fire.gif" style={{ width: '20px', height: '20px', display: 'flex' }} />}
                    </span>
                    </div>
                    <>
                        {currentMenuIndex === id ? <div className={styles.routerIcon}>
                            <img src="/images/top.png" alt="" />
                        </div> : <div className={styles.routerIcon}>
                            <img src="/images/bottom.png" alt="" />
                        </div>
                        }
                    </>
                </div>
                <div className={styles.mobilemenuItem}
                    style={{ display: currentMenuIndex === id ? 'block' : 'none' }}>
                    {navItemEle}
                </div>
            </div>
        );
        return ele;
    }
    const language = getLocale() || 'en-US'
    const [showLan, setShowlan] = useState(false)
    return <div className={styles.mobilebox}>
        <div className={styles.mobilemenu}>
            {parentH5NavItem()}
        </div>
        <div className={styles.language} onClick={() => setShowlan(!showLan)}>
            <div className={styles.langtext}>
                {t('language')}
            </div>
            <div className={styles.lngright}>
                <span className={styles.curreylng}>{Languages[language].title}</span>
                <span className={styles.rightImg}>
                    <img src="/images/right.png" alt="" />
                </span>
            </div>
        </div>
        <div style={{
            display: 'flex', flexDirection: 'column', width: '100%',
            alignItems: 'flex-end', overflow: 'hidden'
        }}>
            {
                showLan && <div className="animate__animated animate__slideInRight animate__faster">
                    {
                        Object.keys(Languages).map((item: string) => {
                            return <div key={item} className={styles.lanRowView} onClick={() => {
                                setLocale(item, false)
                                setShowlan(false)
                            }}>
                                <span className={styles.curreylng}>{Languages[item].title}</span>
                                <span className={styles.rightImg}>
                                </span>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    </div>

}
export default MobileMenu
