import React from "react";
import styles from './item.module.scss'
import {history} from 'umi'
interface CollectionItemProps {
    data: Object
}

const CollectionItem = (props: CollectionItemProps) => {
    // const { data} = props;
    const data = {
        "img": '/images/collection.png',
        "name": 'Sunflower Land Buds',
        "describe": 'Doodles is a community-driven Doodles NFT project. The road map for Doodles is collaborative and will',
        "floor": '0.1208 ETH',
        "volum": '0.1208 ETH',
        "owners": "3690"
    }
    return <div className={styles.nodeItem} onClick={()=>{
        history.push('/detail')
    }}>
        <div className={styles.ItemImg}>
            <img src={data?.img} alt="" />
        </div>
        <div className={styles.cont}>
            <div className={styles.nodename}>
                {data?.name}
            </div>
            <div className={styles.nodedescribe}>
                {data?.describe}
            </div>
            <div className={styles.nodefooter}>
                <div className={`${styles.Item}`}>
                    <div className={styles.title}>
                        Floor
                    </div>
                    <div className={styles.value}>
                        {data?.floor}
                    </div>
                </div>
                <div className={`${styles.Item}`}>
                    <div className={styles.title}>
                        volum
                    </div>
                    <div className={styles.value}>
                        {data?.volum}
                    </div>
                </div>
                <div className={`${styles.Item}`}>
                    <div className={styles.title}>
                        owners
                    </div>
                    <div className={styles.value}>
                        {data?.owners}
                    </div>
                </div>
            </div>
        </div>

    </div>
}
export default CollectionItem