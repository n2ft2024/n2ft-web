import React from 'react';
import { Pie } from '@ant-design/charts';
const RoundChart = (props: any) => {
    const {data,status}=props;
    console.log(status,'status')
    const type = 0
    data:data

    const config: any = {
        appendPadding: 6,
        data,
        angleField: 'value',
        radius: 0.9,
        innerRadius: 0.7,
        color: () => {
            const color = status===1 ? '#26A17B' : '#E33D3D'
            return color
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
                fontSize: 10,
            },
        },
        tooltip: false,
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 12,
                },
                content: Math.round(((data[0]?.value / data[0]?.total) * 100)) + '%',
            },
        },
    };

    return <Pie {...config}  style={{width:"80px", height:"80px"}}/>

};

export default RoundChart;
