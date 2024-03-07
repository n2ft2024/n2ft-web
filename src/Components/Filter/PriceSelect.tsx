import React, { useState } from 'react'
import styles from './index.module.scss'
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { Collapse, Input, InputNumber, Select } from 'antd';
import { useSetState } from 'ahooks';
interface IProps {
    value: string
    data: { label: string; value: string }[]
    onChange: (opt: { min?: number; max?: number; selectValue?: string }) => void
}

interface IStateProps {
    min: number | undefined
    max: number | undefined
    selectValue: string
}
const PriceSelect = (props: IProps) => {
    const { onChange } = props;
    const [iconDirection, setIconDirection] = useState<'up' | 'down'>('down');
    const { t } = useTranslationLanguage()
    const options = [
        { value: 'BNB', label: '1', img: '1' },
        { value: 'ETH', label: '2', img: '1' },
        { value: 'Chain', label: '3', img: '1' },
    ];
    const [state, setState] = useSetState<IStateProps>({
        min: undefined,
        max: undefined,
        selectValue: 'BNB',
    })
    const optionsList = options.map(option => {
        return {
            value: option.value,
            label: (
                <div className={styles.priceItem}>
                    <span>{option?.img}</span>
                    <span>{option.label}</span>
                </div>
            ),
        }
    })
    const ele = (
        <div className={styles.priceBox}>
            <Select
                defaultOpen={false}
                defaultValue={'BNB'}
                onChange={e => setState({ selectValue: e as string })}
                options={optionsList}
                className={styles.priceselect}
            />
            <div className={styles.priceInput}>
                <InputNumber
                    controls={false}

                    onChange={(opt: any) => {
                        setState({ min: opt })
                    }}
                    value={state.min} />
                <div className={styles.to}>{t('to')}</div>
                <InputNumber
                    controls={false}
                    onChange={(opt: any) => {
                        console.log(opt, 'asdasd')
                        setState({ max: opt })
                    }}
                    value={state.max} />
            </div>
            <div className={styles.apply} onClick={() => onChange(state)}
                style={{
                    background: state.max || state.min ? '#EF8339' : '#FFDCC3',
                    color: state.max || state.min ? '#F5F5F5' : '#FFAB71'
                }}
            >
                {t('apply')}
            </div>

        </div>

    )
    return <Collapse
        expandIcon={() => (iconDirection === 'up' ? <div className={styles.icon}><img src="/images/down.png" alt="" /></div> : <div className={styles.icon}><img src="/images/up.png" alt="" /></div>)}
        expandIconPosition="end"
        items={[{
            label: <div className={styles.statuslebel}>{t('price')}</div>,
            children: ele
        }]}
        ghost={true}
        onChange={(key) => setIconDirection(key.length > 0 ? 'up' : 'down')}
    />
}
export default PriceSelect
