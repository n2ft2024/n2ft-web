import React from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";

interface NodeItems {
    accountList: any;
    collectionlist: any;
    isLoading: boolean;
}

const NodeItem = (props: NodeItems) => {
    // const [accountList] = props;
    const {t}=useTranslationLanguage()
    function collectionList() {
        return <div className={styles.collectionItem}>
            <div className={styles.collectionImg}>
                <img src="/images/Rectangle.png" alt="" />
            </div>
            <div className={styles.collectioninfo}>
                <div className={styles.collectiontop}>
                    <div className={styles.collectiontitle}>
                    Doodle Apes BSC
                    </div>
                    <div className={styles.collectioniconup}>
                    <img src="/images/up.png" alt="" />
                    </div>
                </div>
                <div className={styles.collectionup}>
                        <div className={styles.collectionleft}>
                            <div className={styles.collectionlog}>
                                <img src="/images/bsc.png" alt="" />
                            </div>
                            <div className={styles.collectionvalue}> 6000</div>
                        </div>

                        <div className={styles.collectionlog}> <img src="/images/eth1.png" alt="" />
                        </div>
                        <div className={styles.collectionvalue}> 6000</div>
                </div>

            </div>
        </div>
    }
    function getaccountList() {
        return <div className={styles.accountItem}>
            <div className={styles.accountImg}>
                <img src="/images/Rectangle.png" alt="" />
            </div>
            <div className={styles.accountname}>Doodle Apes BSC</div>
        </div>
    }
    return <div className={styles.nodeItem}>
        <>
            <div className={styles.collecttitle}>
           {t('collection')}
            </div>
            {collectionList()}
        </>
        <div className={styles.account}>
            <div className={styles.accountitle}>
        {t('account')}
            </div>
            {getaccountList()}
        </div>
    </div>


}
export default NodeItem