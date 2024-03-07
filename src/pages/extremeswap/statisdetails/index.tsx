import React, { useEffect, useState } from "react";
import commonStyle from '@/Common/common.module.scss'
import styles from './index.module.scss'
import { Column } from '@ant-design/plots';
import { DatePicker, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import './index.scss'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
const StaticDetail = () => {
    const { RangePicker } = DatePicker;
    const {t}=useTranslationLanguage()
    const data = [
        {
            name: 'London',
            '1': 'Jan.',
            '2': 18.9,
        },
    ];
   
    
    const config: any = {
        data,
        isGroup: true,
        xField: '',
        yField: '',
        seriesField: 'name',
        columnWidthRatio: 0.5,
        color: ['#EF8339', '#26A17B'],
        marginRatio: 0.1,
        label: false,
        barWidthRatio: 0.4,
        legend: {
          custom: false,
          position: 'top-right',
          itemMarker: null,
          onHover: (ev: any, chart: any) => {
            const items = chart.getComponents().filter((co: any) => co.type === 'legend-item');
            items.forEach((item: any) => {
                item.update({
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#EF8339',
                            lineWidth: 0,
                        },
                    },
                });
            });
        },
    },
        yAxis: {
          grid: {
            line: {
              style: {
                lineWidth: 0,
              },
            },
          },
        },
      };
      

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    return <div className={commonStyle.mainView}>
        <div className={commonStyle.mainContent}>
            <div className={styles.title}>
         {t('NFT data overview')}
            </div>
            <div className={styles.selectbox}>
                <RangePicker
                    presets={[
                        {
                            label: <span aria-label="Current Time to End of Day">Now ~ EOD</span>,
                            value: () => [dayjs(), dayjs().endOf('day')], // 5.8.0+ support function
                        },
                        ...rangePresets,
                    ]}
                    showTime
                    format="YYYY-MM-DD"
                    onChange={onRangeChange}
                />
            </div>
            <div className={styles.etcharts}>
                {/* <div className={styles.chart_btn}>
                    <div className={styles.resale}>转售</div>
                    <div className={styles.preorder}>预购</div>
                </div> */}
                <div className={styles.charts}>
                    <Column {...config} />
                </div>
            </div>
            <div className={styles.staticList}>
                <div className={styles.statictitle}>
                    <div className={styles.staticlabel}>
                     {t('NFT data statistics')}
                    </div>
                    <div className={styles.staticdate}>
                        2023.10.01～2023.10.07
                    </div>
                </div>
                <div className={styles.staticItem}>
                    <div className={styles.staticItemlabel}>
                    {t('NFT quantity')}：
                    </div>
                    <div className={styles.staticItemvalue}>
                        4,542
                    </div>
                </div>
                <div className={styles.staticItem}>
                    <div className={styles.staticItemlabel}>
                       {t('Pre-order NFT amount')}：
                    </div>
                    <div className={styles.staticItemvalue}>
                        2,945.23 USDT
                    </div>
                </div>
                <div className={styles.staticItem}>
                    <div className={styles.staticItemlabel}>
                    {t('resold Nft')}：
                    </div>
                    <div className={styles.staticItemvalue}>
                        39,698
                    </div>
                </div>
                <div className={styles.staticItem}>
                    <div className={styles.staticItemlabel}>
                        {t('Resale NFT amount')}：
                    </div>
                    <div className={styles.staticItemvalue}>
                        2,345.23 USDT
                    </div>
                </div>
                <div className={styles.staticItem}>
                    <div className={styles.staticItemlabel}>
                        {t('reselling NFTs')}：
                    </div>
                    <div className={styles.staticItemincome}>
                        600.23 USDT
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default StaticDetail