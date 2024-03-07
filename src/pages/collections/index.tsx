import React, { useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import CollectionItem from './collectionItem';
import { history } from 'umi';
const Collections = () => {
    const { t } = useTranslationLanguage()
    const [typeValue, setTypeValue] = useState<string>('all')
    const typeList = [
        {
            name: t('all'),
            value: 'all'
        },
        {
            name: t('art'),
            value: 'art'

        },
        {
            name: t('gaming'),
            value: 'gaming'
        },
        {
            name: t('virtualreality'),
            value: 'virtual reality'
        },
        {
            name: t('Memberships'),
            value: 'Memberships'
        },

    ]
    const briefList = [
        {
            img: "",
            icon: '',
            name: 'Azuki Elementals'
        }
    ]
    return <div className={styles.collections}>
        <div className={styles.collectionstitle}>
            {t('collectionTitle')}
        </div>
        <div className={styles.collectionsdescribe}>
            <span className={styles.collectiondescribeforward}>
                {t('collectiondescribeforward')}
            </span>
            <span className={styles.collectiondescribecont}>
                245,345,234
            </span>
            <span className={styles.collectiondescribeback}>
                {t('collectiondescribeback')}
            </span>
        </div>
        <div className={styles.brief}>
            {[...new Array(10)].map((item, index) => {
                return <div className={styles.briefItem} key={index} >
                    <div className={styles.briefimg}>
                        <img src="/images/briefImg.png" alt="" />
                    </div>
                    <div className={styles.brieficon}>
                        <img src="/images/brieficon.png" alt="" />
                    </div>
                    <div className={styles.briefname}>
                        Azuki Elementals
                    </div>
                </div>
            })}
        </div>

        <div className={styles.tab}>
            {typeList.map((item, index) => {
                return <div key={index}
                    className={`${styles.tabnav} ${typeValue === item.value ? styles.active : ''}`}
                    onClick={() => {
                        setTypeValue(item.value)
                    }}
                >
                    {item.name}
                </div>
            })}
        </div>
        <div className={styles.collectioncontent}>
            {[...new Array(30)].map((item) => {
                return <CollectionItem data={item} />
            })}

        </div>
    </div>
}
export default Collections
