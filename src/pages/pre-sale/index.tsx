import React, { useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { useModalContext } from "@/provider/modalProvider";
import BuyModal from "./buymodal";
import BindModal from "./bind";
import { useGetInviter, useNFTPrice } from "@/Contract";
import { Spin } from "antd";
import LoadingText from "@/Components/LoadingText";
import '../../Common/common.scss';
import { useSpring, animated } from "react-spring";
interface Buyprops { title: string; img: string; presaleprice: string; originalprice: string; value: string; id: number }
const Presale = () => {
    const { t } = useTranslationLanguage()
    const data = [
        {
            title: t('silverMember'),
            img: '/images/silverMember.png',
            presaleprice: "35",
            originalprice: '50',
            value: '50',
            id: 1,
        },
        {
            title: t('goldMember'),
            img: '/images/goldMember.png',
            presaleprice: "140",
            originalprice: '200',
            value: '200',
            id: 2,

        },
        {
            title: t('platinumMember'),
            img: '/images/platuimMember.png',
            presaleprice: "700",
            originalprice: '1000',
            value: '1000',
            id: 3,
        },
        {
            title: t('Supreme Member'),
            img: '/images/supremeMember.png',
            presaleprice: "700",
            originalprice: '10000',
            value: '10000',
            id: 4,
        }

    ]
    const [card, setCard] = useState<any>(data[0])
    const handleCardClick = (card: any) => {
        setCard(card);
    };
    const anima1: any = useSpring({
        from: card.id === 1 ? { transform: 'scale(1)' } : { transform: 'scale(1)' },
        to: card.id === 1 ? { transform: 'scale(1.3)',opacity:1 } : { transform: 'scale(1)',opacity:0.3 },
    })
    const anima2: any = useSpring({
        from: card.id === 2 ? { transform: 'scale(1)' } : { transform: 'scale(1)' },
        to: card.id === 2 ? { transform: 'scale(1.3)',opacity:1 } : { transform: 'scale(1)',opacity:0.3 },
    })
    const anima3: any = useSpring({
        from: card.id === 3? { transform: 'scale(1)' }  : { transform: 'scale(1)' },
        to: card.id === 3? { transform: 'scale(1.3)',opacity:1 } : { transform: 'scale(1)',opacity:0.3 },
    })
    const anima4: any = useSpring({
      from: card.id === 4 ? { transform: 'scale(1)' }  : { transform: 'scale(1)' },
      to: card.id === 4 ? { transform: 'scale(1.3)',opacity:1 } : { transform: 'scale(1)',opacity:0.3 },
    })
    return <>
        <div className={styles.presalemobile}>
            <div className={styles.title}>
                {t('salelist')}
            </div>
            <div className={styles.salecont}>
                {data.map((item, index) => {
                    return <NFTItem item={item} key={index + 'nft'} />
                })}
            </div>
        </div>
        <div className={styles.presale}>
            <div className={styles.salebg}>
                <div className={styles.saleItems}>
                    <animated.div className={styles.silver1} onClick={() => { handleCardClick(data[0]) }}
                        style={{
                            zIndex: card.id == 1 ? 10 :card.id + 2,
                            transformOrigin:'left',
                            ...anima1,
                        }}>
                   <img src="/images/silver3.png" alt="" />

                    </animated.div>
                <animated.div className={styles.silver2} onClick={() => { handleCardClick(data[1]) }}
                        style={{
                          zIndex: card.id == 2 ? 10 :card.id + 2,
                          transformOrigin:'left',
                          ...anima2
                        }}>
                        <img src="/images/silver2.png" alt="" />
                    </animated.div >
                     <animated.div className={styles.silver3} onClick={() => { handleCardClick(data[2]) }}
                        style={{
                            zIndex: card.id == 3 ? 10 :card.id + 2,
                            transformOrigin:'left',
                          ...anima3
                        }} >
                   
                   <img src="/images/silver1.png" alt="" />

                    </animated.div >
                       <animated.div className={styles.silver4} onClick={() => { handleCardClick(data[3]) }}
                        style={{
                          zIndex: card.id == 4 ? 10 :card.id + 2,
                          transformOrigin:'left',
                          ...anima4
                        }} >
                        <img src="/images/silver4.png" alt="" />
                    </animated.div >
                </div>
                <NFTItem item={card} />
            </div>
        </div>
    </>
}
function NFTItem({ item }: any) {

    const { t } = useTranslationLanguage()
    const modalContext = useModalContext()
    const inviterInfo = useGetInviter()

    const nftInfo = useNFTPrice(item.id)

    const BuySale = (data: Buyprops) => {
        console.log('data=====',data)
        if (inviterInfo.isLoading || !nftInfo.data) {
            return
        }
        if (!inviterInfo.data?.isBind) {
            modalContext.show(
                <BindModal onClose={() => {
                    modalContext.hidden()
                }} onBindSuccess={() => {
                    onShowBuyModal(data)
                }} />
            )
            return
        }
        onShowBuyModal(data)
    }
    function onShowBuyModal(data: Buyprops) {
        modalContext.show(
            <BuyModal
                price={nftInfo.data?.price}
                data={data}
                modalContext={modalContext}
                onClose={() => {
                    modalContext.hidden()
                }}
                onSuccess={() => {
                    modalContext.hidden()

                }}
            />
        )
    }
    return <div className={styles.saleItem}>
        <div className={styles.saleImg}>
            <img src={item.img} alt="" />
        </div>
        <div className={styles.salecontent}>
            <div className={styles.saletitle}>
                {item?.title}
            </div>
            <div className={styles.price}>
                {/* <div className={styles.pre}>
                    <div className={styles.presalePrice}>
                        {t('preprice')}
                    </div>
                    {!nftInfo.data ? <LoadingText /> : <div className={styles.presalevalue}>
                        {nftInfo.data?.price}U
                    </div>}
                </div> */}
                <div className={styles.origin}>
                    <div className={styles.originalprice}>
                        {t('price')}
                    </div>
                    {/* <div className={styles.originvalue}>
                        {item?.originalprice}U
                    </div> */}
                    {!nftInfo.data ? <LoadingText /> : <div className={styles.originvalue}>
                        {item?.originalprice}U
                    </div>}
                </div>
            </div>

            <div className={styles.salefooter}>
                <div className={styles.saleicon}>
                    <img src="/images/fill.png" alt="" />
                </div>
                <div className={styles.integral}>
                    <div className={styles.integraltitle}>
                        {t('points')}
                    </div>
                    {/* <div className={styles.integralvalue}>
                        {t('value')} {item?.value}U
                    </div> */}
                    {!nftInfo.data ? <LoadingText /> : <div className={styles.integralvalue}>
                        {t('value')} {item?.value}U
                    </div>}
                </div>
            </div>
            <Spin spinning={inviterInfo.isLoading}>
                <div className={styles.buy} onClick={() => {
                    BuySale(item)
                }}>
                    {t('Buy')}
                </div>
            </Spin>

        </div>
    </div>
}
export default Presale