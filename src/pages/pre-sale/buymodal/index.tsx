import useTranslationLanguage from '@/hooks/useTranslationLanguage'
import styles from './index.module.scss'
import Item from 'antd/es/list/Item'
import PaymentResult from '../../pre-sale/paymentureslt'
import { useApprove } from '@/hooks/useTokenContract'
import { N2Relation_ADDRESSSES, USDT_ADDRESSSES } from '@/Contract/addresses'
import { ApprovalState } from '@/Common'
import { useN2FTContract, useN2RelationContract } from '@/hooks/useContract'
import { useSendTransactionOld } from '@/Contract'
import { useLoadingContext } from '@/provider/loadingProvider'
export default function BuyModal({ onClose, data,modalContext,price }: any) {
    const { t } = useTranslationLanguage()
    const [approveStatus,approved] = useApprove(USDT_ADDRESSSES,N2Relation_ADDRESSSES,price)
    const N2RelationContract = useN2RelationContract(N2Relation_ADDRESSSES)
    const sendTransactionOld = useSendTransactionOld()
    const loadingContext = useLoadingContext()
    const hanleBuyNft = (data: any) => {
      if (approveStatus != ApprovalState.APPROVED){
        approved && approved()
        return
      }
      if (!N2RelationContract){
        return
      }
      sendTransactionOld.mutate({
        title:'Mint',
        func:N2RelationContract.purchaseM,
        args:[data.id],
        onSuccess:()=>{
          loadingContext.hide()
          modalContext.show(
            <PaymentResult
                type={true}
                onClose={() => {
                    modalContext.hidden()
                }}
            />)
        },
        onError:()=>{
          loadingContext.hide()
          modalContext.show(
            <PaymentResult
                type={false}
                onClose={() => {
                    modalContext.hidden()
                }}
            />)
        }
      })
    }
    return <div className={styles.bg}>
        <div className={styles.rowBetween}>
            <span className={styles.title}>{t('purchasepresaleNFT')}</span>
            <div className={styles.close} onClick={onClose}>
                <img src='/images/close.png' />
            </div>
        </div>
        <div className={styles.con}>
            <div className={styles.buycont}>
                <div className={styles.butImg}>
                    <img src={data?.img} alt="" />
                </div>
                <div className={styles.buytext}>
                    <div className={styles.buytitle}>
                        {data?.title}
                    </div>
                    {/* <div className={styles.buypre}>
                        <div className={styles.buypretext}>
                            {t('presalePrice')}
                        </div>
                        <div className={styles.buyvalue}>
                            {price}U
                        </div>
                    </div> */}

                    <div className={styles.buyorigin}>
                        <div className={styles.buyorigintext}>
                            {t('price')}
                        </div>
                        <div className={styles.buyoriginvalue}>
                            {data?.originalprice}USDT
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.describe}>
                <div className={styles.describeItem}>
                    {t('type')} : {data?.title}
                </div>
                {/* <div className={styles.describeItem}>
                    {t('presalePrice')} : {price}USDT

                </div> */}
                <div className={styles.describeItem}>
                    {t('price')} : {data?.originalprice}USDT

                </div>
                <div className={styles.describeItem}>
                    {t('points')} : {t('value')} {data?.value}USDT
                </div>
                {/* <div className={styles.describeItem}>
                    {t('purchaseTime')} : 2023-10-02 19:34:22
                </div> */}
            </div>
            <div className={styles.butBtn} onClick={() => {
                hanleBuyNft(data)
            }}>
                {approveStatus != ApprovalState.APPROVED ? t('approve') + ' USDT' : t('paymentResult')}
            </div>
        </div>



    </div>
}