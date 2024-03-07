import React from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import LoadingText from "@/Components/LoadingText";
import { useModalContext } from "@/provider/modalProvider";
import { useGetInviter, useGetNewInviter, useNFTPrice } from "@/Contract";
import { Spin } from "antd";
import BindModal from './bind';
import BuyModal from "./buymodal";
interface Buyprops { title: string; img: string; presaleprice: string; originalprice: string; value: string; id: number }
function BuySale({onClose}:any){
    const { t } = useTranslationLanguage()
    const data = [
        {
            title: t('silverMember'),
            img: '/images/silverMember.png',
            value: '50',
            id: 1,
        },
        {
            title: t('goldMember'),
            img: '/images/goldMember.png',
            value: '200',
            id: 2,
        },
        {
            title: t('platinumMember'),
            img: '/images/platuimMember.png',
            value: '1000',
            id: 3,
        },
        {
            title: t('Supreme Member'),
            img: '/images/supremeMember.png',
            value: '10000',
            id: 4,
        }
    ]

    return <div className={commonStyle.mainView}>
        <div className={styles.mincont}>
            <div className={styles.presalemobile}>
                <div className={styles.salecont}>
                    {data.map((item, index) => {
                        return <NFTItem onClose={onClose} item={item} key={index + 'nft'} />
                    })}
                </div>
            </div>

        </div>
    </div>

}
export default BuySale


function NFTItem({ item,onClose }: any) {
    const { t } = useTranslationLanguage()
    const modalContext = useModalContext()
    const newInviterInfo = useGetNewInviter()
    const nftInfo = useNFTPrice(item.id)

    function onChangeBuySale(data: Buyprops){
        if (newInviterInfo.isLoading || !nftInfo.data) {
            return
        }
        onClose && onClose()
        if (!newInviterInfo.data?.isBind) {
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
                price={item.value}
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
        <div className={styles.sasaleItem_into}>
            <div className={styles.saleImg}>
                <img src={item.img} alt="" />
            </div>
            <div className={styles.salecontent}>
                <div className={styles.saletitle}>
                    {(item?.title)}
                </div>
                <div className={styles.price}>
                    <div className={styles.pre}>
                        <div className={styles.presalePrice}>
                            {t('price')}
                        </div>
                        {!nftInfo.data ? <LoadingText /> : <div className={styles.presalevalue}>
                            {item.value}U
                        </div>}
                    </div>
                    {/* <div className={styles.origin}>
                        <div className={styles.originalprice}>
                            {t('originalprice')}
                        </div>
                        {!nftInfo.data ? <LoadingText /> : <div className={styles.originvalue}>
                            {item?.originalprice}U
                        </div>}
                    </div> */}
                </div>
                <div className={styles.salefooter}>
                    <div className={styles.saleicon}>
                        <img src="/images/fill.png" alt="" />
                    </div>
                    <div className={styles.integral}>
                        <div className={styles.integraltitle}>
                            {t('points')}
                        </div>
                        {!nftInfo.data ? <LoadingText /> : <div className={styles.integralvalue}>
                            {t('value')} {item?.value}U
                        </div>}
                    </div>
                </div>
                <Spin spinning={newInviterInfo.isLoading}>
                    <div className={styles.buy} onClick={() => {
                        onChangeBuySale(item)
                    }}>
                        {t('buy')}
                    </div>
                </Spin>
            </div>
        </div>
        <Spin spinning={newInviterInfo.isLoading}>
            <div className={styles.pc_buy} onClick={() => {
                onChangeBuySale(item)
            }}>
                {t('buy')}
            </div>
        </Spin>
    </div>
}