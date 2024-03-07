import { Select } from "antd";
import React, { useState } from "react";
import styles from './index.module.scss'
import './index.scss'
import { divide } from "lodash";
import { useSetState } from "ahooks";
interface SortSelectprops {
    onChange: (value: string) => void;
}
const SortSelect = (props: SortSelectprops) => {
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ];
    const { onChange } = props;
    const [sortValue, setSortValue] = useSetState<any>(options[0].value)
    const handleSelectChange = (value: string) => {
        onChange(value);
        setSortValue(value)
    };
    const optionsList = options.map(option => {
        return {
            value: option.value,
            label: (
                <div className={styles.sortbox}>
                    <span>{option.label}</span>
                    {Object.values(sortValue).join() === option.value && (
                        <div className={styles.sortImg}>
                            <img src="/images/radius.png" alt="" />
                        </div>
                    )}
                </div>
            ),
        }
    })
    return (
        <div className={styles.select}>
            <Select
                defaultOpen={false}
                defaultValue={Object.values(sortValue).join()}
                onChange={handleSelectChange}
                options={optionsList}
                className={styles.selectInput}
            />
            <div className={styles.selectImg}>
                <img src="/images/selecticon.png" alt="" />
            </div>
        </div>
    );
};
export default SortSelect