import { Input } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './index.module.scss'
import { UserOutlined } from '@ant-design/icons';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import useClickAway from '@/hooks/useclickAway';
// import './index.scss'
import NodeItem from '@/Components/NodeItem';
import _ from 'lodash';
const HeaderInput = () => {
    const { t } = useTranslationLanguage()
    const [open, setopen] = useState<boolean>(false)
    const searchRef = useRef(null);
    const [searchValue,setSearchValue]=useState<string>('')
    const SearchInput = (value: string) => {
       
    }
    useClickAway(() => {
        setopen(false)
    }, [searchRef])
    const clickSearcTable = () => {
        if (searchValue) {
            setopen(true);
        }
      };
    const  handleClick=_.debounce(SearchInput,500)
    return <div className={styles.headerInput} ref={searchRef}>
        <Input placeholder={t('pleaseholder')}
          className={styles.input} 
          disabled
          // onChange={(e)=>{
          //   e.nativeEvent.stopImmediatePropagation();
          //   setopen(true)
          //   setSearchValue(e.target.value)
          //   handleClick(e.target.value);
          // }
            
          // } 
          // onFocus={(e) => {
          //   e.nativeEvent.stopImmediatePropagation();
          //   clickSearcTable();
          // }}
        />
        <div className={styles.search}>
            <img src="/images/search.png" alt="" />
        </div>
        {open && <div className={styles.searchBox}>
            <NodeItem accountList={[]} collectionlist={[]} isLoading={false} />
        </div>}

    </div>
}
export default HeaderInput