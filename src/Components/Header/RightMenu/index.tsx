import React, { useEffect, useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useChainId, useNetwork } from "wagmi";
import { formatAccount } from "@/Common";
import { Drawer, message } from "antd";
import './index.scss'
import ShoppingCart from "@/Components/ShoppingCart";
import WalletInfomation from "@/Components/WalletInfomation";
import MobileSearch from "../MobileSearch";
import MobileMenu from "../MobileMenu";
import multiavatar from '@multiavatar/multiavatar/esm'
import copy from 'copy-to-clipboard';
import { getLocale, setLocale } from "umi";
import { Languages } from "../utils";
import CustomDrawer from "@/Components/Drawer"
import useMedia from "use-media";
const RightMenu = () => {
    const { t } = useTranslationLanguage()
    const [open, setOpen] = useState(false);
    const [OpenDraw, setOpenDraw] = useState<boolean>(false)
    const [mobileDraw, setMobileDraw] = useState<boolean>(false)
    const [SearchOpen, setSearchOpen] = useState<boolean>(false)
    const [routerDraw, setRouterDraw] = useState<boolean>(false)
    const [Menmber, setMember] = useState<boolean>(false)

    const [Membership, setMembership] = useState<boolean>(false)
    const isMobile = useMedia({ maxWidth: '768px' })

    const onClose = () => {
        setOpen(false)
    }
    const OpenAdd = () => {
        if (OpenDraw) {
            setOpenDraw(false)
            setOpen(true)
        } else {
            setOpen(true)
        }
    }
    useEffect(() => {
        if (!isMobile) {
            setRouterDraw(false)
        }
    }, [isMobile])
    return <>
        <div className={styles.rightmenus}>
            <ConnectWallet cartOpen={open} setOpenDraw={setOpenDraw} OpenDraw={OpenDraw} setCartOpen={setOpen} setMobileDraw={setMobileDraw} mobileDraw={mobileDraw} setMember={setMember} Menmber={Menmber} setMembership={setMembership} Membership={Membership} routerDraw={routerDraw} setRouterDraw={setRouterDraw} />
            {/* <div className={styles.cart}
                onClick={OpenAdd}
            >
                <div className={styles.cartImg}>
                    <img src="/images/cart.png" alt="" />
                </div>
            </div> */}
            <Language />
        </div>
        <div className={styles.mobilemenu}>
            {/* <ConnectWallet cartOpen={false} OpenDraw={false} setOpenDraw={setOpenDraw} setCartOpen={setOpen} setMobileDraw={setMobileDraw} mobileDraw={false}/> */}
            {/* <div className={styles.icon}>
                <img src="/images/eth.png" alt="" />
            </div> */}
            {/* <div className={styles.icon} onClick={() => {
                if (open || OpenDraw || mobileDraw || routerDraw) {
                    setOpen(false)
                    setMobileDraw(false)
                    setOpenDraw(false)
                    setRouterDraw(false)
                }
                setSearchOpen(!SearchOpen)
            }}>
                <img src="/images/search_mobile.png" alt="" />
            </div> */}
            {/* <div className={styles.icon}
                onClick={() => {
                    if (SearchOpen || OpenDraw || mobileDraw || routerDraw) {
                        setSearchOpen(false)
                        setMobileDraw(false)
                        setOpenDraw(false)
                        setRouterDraw(false)
                    }
                    setOpen(!open)
                }}>
                <img src="/images/cart.png" alt="" />
            </div> */}
            <ConnectWallet cartOpen={open} setOpenDraw={setOpenDraw} OpenDraw={OpenDraw} setCartOpen={setOpen} setMobileDraw={setMobileDraw} mobileDraw={mobileDraw} Menmber={Menmber} setMember={setMember} setMembership={setMembership} Membership={Membership} routerDraw={routerDraw} setRouterDraw={setRouterDraw} />
            <div className={styles.labelicon} onClick={() => {
                if (SearchOpen || OpenDraw || mobileDraw || open) {
                    setSearchOpen(false)
                    setMobileDraw(false)
                    setOpenDraw(false)
                    setOpen(false)
                    setMember(false)
                }
                setRouterDraw(!routerDraw)
            }}>
                <img src="/images/more.png" alt="" />
            </div>
        </div>
        {/* 端购物车 */}
        <Drawer title={<div className={styles.drawtitle}>
            <div className={styles.carttitle}> {t('mycart')} ( 3 )</div>
            <div className={styles.clear}>{t('clear')}</div>
        </div>} placement="right" onClose={onClose} open={open} >
            <ShoppingCart shopList={[{}]} />
        </Drawer>
        {/*   移动端查询抽屉 */}
        <Drawer
            title={''}
            placement="right"
            onClose={() => { setSearchOpen(false) }}
            open={SearchOpen}
            height={'95%'}
            closeIcon={false}
        >
            <MobileSearch />
        </Drawer>
        <CustomDrawer
            open={routerDraw}
            onClose={() => { setRouterDraw(false) }}
        >
            <MobileMenu onChange={() => {
                setRouterDraw(false)
            }} />
        </CustomDrawer>

    </>

}

function Language() {
    const language = getLocale() || 'en-US'
    const [show, setShow] = useState(false)
    return <div className={styles.lng} onMouseEnter={() => {
        setShow(true)
    }} onMouseLeave={() => {
        setShow(false)
    }}>
        <img className={styles.lanImg} src={`/images/${language}.png`} alt="" />
        <div className={styles.langtext}>
            {Languages[language]?.key}
        </div>
        {
            show && <div className={styles.lanView}>
                <div className={styles.lanContentView}>
                    {
                        Object.keys(Languages).map((item: string, index: number) => {
                            return <div key={item} className={styles.lanRowView} onClick={() => {
                                setLocale(item, false)
                                setShow(false)
                            }}>
                                <img className={styles.lanImg} src={Languages[item].icon} alt="" />
                                <span className={styles.langtext}>{Languages[item].key}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        }
    </div>
}
interface ConnectWalletProps {
    cartOpen: boolean;
    OpenDraw: boolean;
    setOpenDraw: Function;
    setCartOpen: Function;
    setMobileDraw: Function;
    mobileDraw: boolean;
    Menmber: boolean;
    setMember: Function;
    setMembership: Function;
    Membership: boolean;
    setRouterDraw: Function;
    routerDraw: boolean
}
function ConnectWallet(props: ConnectWalletProps) {
    const { cartOpen, setOpenDraw, OpenDraw, setCartOpen, setMobileDraw, mobileDraw, Menmber, setMember, setMembership, Membership, routerDraw, setRouterDraw } = props;
    const { t } = useTranslationLanguage()
    const { open, } = useWeb3Modal()
    const { address, connector } = useAccount()
    const { chain } = useNetwork()
    const isMobile = useMedia({ maxWidth: '768px' })
    const addressString: any = address?.toString()
    const svgCode = multiavatar(addressString)
    const [copySuccess, setCopysuccess] = useState<boolean>(false)
    function onConnectWallet() {
        if ((cartOpen || Menmber || Membership || OpenDraw || routerDraw) && address && !chain?.unsupported) {
            setCartOpen(false)
            setMember(false)
            setMembership(false)
            setOpenDraw(true)
            setMobileDraw(false)
            setOpenDraw(false)
            setRouterDraw(false)
        }
        if (address && !chain?.unsupported) {
            setOpenDraw(true)
        } else {
            open && open()
        }
    }
    function MobileConnect() {
        if ((cartOpen || Menmber || mobileDraw || Membership || OpenDraw || routerDraw) && address && !chain?.unsupported) {
            setCartOpen(false)
            setMember(false)
            setMobileDraw(true)
            setMembership(false)
            setMobileDraw(false)
            setOpenDraw(false)
            setRouterDraw(false)

        }
        if (address && !chain?.unsupported) {
            setMobileDraw(true)
        } else {
            open && open()
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setCopysuccess(false)
        }, 2000);
    }, [copySuccess])
    function ele() {
        return <div className={styles.Information}>
            <div className={styles.InforImg} dangerouslySetInnerHTML={{ __html: svgCode }}>
            </div>
            <div className={styles.Inforcont}>
                {/* <div className={styles.Infotitle}>
                    12312312
                </div> */}
                <div className={styles.InforBox}>
                    {/* <div className={styles.InfoaddressIcon}>
                        <img src="/images/unnamed.png" alt="" />
                    </div> */}
                    <div className={styles.Infoaddress}>
                        {chain?.unsupported ? '网络错误' : formatAccount(address)}
                    </div>
                    <div className={styles.copy} onClick={() => {
                        copy(addressString)
                        setCopysuccess(true)
                    }}>
                        {copySuccess ? <img src="/images/success.png" alt="" /> : <img src="/images/copy.png" alt="" />}
                    </div>
                </div>
                {/* <div className={styles.inforbot}>
                    {t('profile')}
                </div> */}
            </div>
        </div>
    }
    const onClose = () => {
        setOpenDraw(false)
    }
    const mobileClose = () => {
        setMobileDraw(false)
    }
    useEffect(() => {
        if (isMobile && OpenDraw) {
            onClose()
            setMobileDraw(true)
        } else if (!isMobile && mobileDraw) {
            mobileClose()
            setOpenDraw(true)
        }
    }, [isMobile, mobileDraw, OpenDraw])
    return <div>
        <div className={styles.wallet} onClick={onConnectWallet}>
            {address ? <div className={styles.walletImg} dangerouslySetInnerHTML={{ __html: svgCode }}>
            </div> : <div className={styles.walletImg}>
                <img src="/images/Wallet.png" alt="" />
            </div>
            }
            <div className={styles.walletText}>
                {address ? (chain?.unsupported ? '网络错误' : formatAccount(address)) : t('connect')}
            </div>
        </div>
        <div className={styles.mobilewallet} onClick={MobileConnect}>
            {address ? <div className={styles.mobileImg} dangerouslySetInnerHTML={{ __html: svgCode }}>
            </div> : <div className={styles.mobileImg}>
                <img src="/images/wallectblack.png" alt="" />
            </div>
            }
        </div>
        <CustomDrawer
            // title={ele()} 
            open={mobileDraw}
            onClose={mobileClose}>
            {ele()}
            <WalletInfomation onClose={mobileClose} setMembership={setMembership} Membership={Membership} />
        </CustomDrawer>
        {/* <Drawer title={ele()} placement="bottom" onClose={mobileClose} open={mobileDraw}
            height={'89.9%'}
            zIndex={1002}
            width={'100%'}
        >
            <WalletInfomation onClose={mobileClose} setMembership={setMembership} Membership={Membership} />
        </Drawer> */}
        <Drawer title={ele()} placement="right" onClose={onClose} open={OpenDraw}
        >
            <WalletInfomation onClose={onClose} setMember={setMember} Menmber={Menmber} setMembership={setMembership} Membership={Membership} />
        </Drawer>
    </div>
}
export default RightMenu
