import React from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { history, useLocation } from 'umi';
import { pages } from "../utils";
import { message } from "antd";
const LeftMenu = () => {
    const { t } = useTranslationLanguage()
    const location = useLocation()
    const menu = pages()
    function subNav(navItem: any, id: number) {
        const navItemEle = navItem?.children?.map((item: any, index: number) => {
            return (
                <div key={index} onClick={() => {

                    history.push(item.link)
                }}
                    className={styles.navtext}>
                    {item.name}
                </div>
            );
        })
        const ele = (
            <div key={id} className={styles.elebox}>
                <div className={styles.navItem}
                    // onClick={() => {
                    //     history.push(navItem.link)
                    // }}
                    style={{ color: navItem?.children?.some((child: any) => child.link === location.pathname) ? '#EF8339' : '', }}>
                    {navItem.name}
                    <span>
                        {navItem?.able && navItem?.file && <img src="/images/fire.gif" style={{ width: '20px', height: '20px', display: 'flex' }} />}
                    </span>
                </div>
                <div className={styles.menuItem}>
                    {navItemEle}
                </div>
            </div>
        );
        return ele;
    }
    return <div className={styles.nav}>
        {menu.map((navItem, index) => {
            if (navItem?.children && navItem?.children.length) {
                return subNav(navItem, index)
            }
            return <div className={styles.navItem} onClick={() => {
                if (navItem.able) {
                    history.push(navItem.link)
                } else {
                    message.warning(t('comming soon~'))
                }
            }}
                style={{ color: location.pathname === navItem.link ? '#EF8339' : ((navItem?.able || !navItem?.file )? '#000000' : '#90949A') }}
                key={index}
            >{navItem.name}
                {navItem?.able && navItem?.file && <img src="/images/fire.gif" style={{ width: '20px', height: '20px', display: 'flex' }} />}</div>

        })}
    </div>
}
export default LeftMenu