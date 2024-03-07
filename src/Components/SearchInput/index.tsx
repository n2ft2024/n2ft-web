import React, { useState } from "react";
import styles from './index.module.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
import { Input } from "antd";
import { useUpdateEffect } from 'ahooks'
interface SearchInputFace {
    onChange: (value: string) => void
}
const SearchInput = (props: SearchInputFace) => {
    const { onChange } = props;
    const { t } = useTranslationLanguage()
    const [value, setValue] = useState<string>('')
    useUpdateEffect(() => {
        onChange && onChange(value)
    }, [value])
    return <div className={styles.searchInput} >
        <Input placeholder={t('pleaseholder')}
            className={styles.input}
            onChange={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                setValue(e.target.value)
            }}
        />
        <div className={styles.search}>
            <img src="/images/search.png" alt="" />
        </div>
    </div>
}
export default SearchInput