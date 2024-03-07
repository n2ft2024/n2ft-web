import React from 'react'
import styles from './index.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
interface ShopList {
    shopList: any[]
}
const ShoppingCart = (props: ShopList) => {
    const { shopList } = props;
    const { t } = useTranslationLanguage()
    return <div className={styles.shoppingcart}>
        {shopList?.length ?
            <>
                <div className={styles.shopItems}>
                    <div className={styles.shopbox}>
                        <div className={styles.linearbox}>
                            <div className={styles.linear}>
                                <img src="/images/linear.png" alt="" />
                            </div>
                        </div>

                        <div className={styles.shopImg}>
                            <img src="/images/Rectangle.png" alt="" />
                        </div>
                        <div className={styles.shopcont}>
                            <div className={styles.shoptext}>
                                <div className={styles.shopname}>Deadmigos</div>
                                <div className={styles.shopcucybox}>
                                    <div className={styles.currency}>
                                        <img src="/images/eth1.png" alt="" />
                                    </div>
                                    <div className={styles.curreyvalue}>
                                        123
                                    </div>
                                </div>
                            </div>
                            <div className={styles.shopbot}>
                                <div className={styles.shopconttext}>
                                    Deadmigos
                                </div>
                                <div className={styles.shopmoney}>
                                    $89
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.pricetotal}>
                    <div className={styles.pricetitle}>
                        {t('pricetotal')}
                    </div>
                    <div className={styles.pricecont}>
                        <div className={styles.pricetop}>
                            <div className={styles.priceImg}>
                                <img src="/images/t.png" alt="" />
                            </div>
                            <div className={styles.pricenumber}>
                                0.003
                            </div>
                        </div>
                        <div className={styles.pricebot}>
                            $0.89
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className={styles.balance}>
                    <div className={styles.balancetitle}>
                        <div className={styles.account}>
                            {t('accountBalance')}
                        </div>
                        <div className={styles.accountvalue}>
                            -
                        </div>
                    </div>
                    <div className={styles.balancecont}>
                        <div className={styles.balanceleft}>
                            <div className={styles.balanceImg}>
                                <img src="/images/t.png" alt="" />
                            </div>
                            <div className={styles.balancetext}>
                                <div className={styles.balancename}>USDT</div>
                                <div className={styles.balancecount}>Balance:0.003</div>
                            </div>
                        </div>
                        <div className={styles.amounts}>
                            0.49
                        </div>
                    </div>
                </div>
                <div className={styles.payment}>
                    <div className={styles.paymenttitle}>
                        <div className={styles.paymentname}>
                            {t('paymentamount')}
                        </div>
                        <div className={styles.paymentright}>
                            <div className={styles.paymenttop}>
                                <div className={styles.paymentImg}>
                                    <img src="/images/t.png" alt="" />
                                </div>
                                <div className={styles.paymentdata}>
                                    999
                                </div>
                            </div>
                            <div className={styles.paymentbot}>
                                123
                            </div>
                        </div>
                    </div>
                    <div className={styles.paymenbutton}>
                        {t('Insufficientbalance')}

                    </div>
                </div>
            </> : <>
                <div>
                    <img src="/images/shopping.png" alt="" />
                    <div className={styles.nodata}></div>
                </div>
                <div className={styles.payment}>
                    <div className={styles.paymenttitle}>
                        <div className={styles.paymentname}>
                            {t('paymentamount')}
                        </div>
                        <div className={styles.paymentright}>
                            -
                            {/* <div className={styles.paymenttop}>
                                <div className={styles.paymentImg}>
                                    <img src="/images/t.png" alt="" />
                                </div>
                                <div className={styles.paymentdata}>
                                    999
                                </div>
                            </div>
                            <div className={styles.paymentbot}>
                                123
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.paymenbutton}>
                        {t('Insufficientbalance')}
                    </div>
                </div>
            </>

        }


    </div >
}
export default ShoppingCart