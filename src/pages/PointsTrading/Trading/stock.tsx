import React, { useEffect, useState } from "react";
import {list} from './utils'
import { Stock } from '@ant-design/plots';
const Stocks=()=>{
    const [data, setData] = useState([]);
    useEffect(() => {
      asyncFetch();
    }, []);
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config: any = {
      data,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
      meta: {
        vol: {
          alias: '',
        },
        open: {
          alias: '',
        },
        close: {
          alias: '',
        },
        high: {
          alias: '',
        },
        low: {
          alias: '',
        },
      },
    };
  
    return <Stock {...config}  style={{width:'100%'}}/>;
}
export default  Stocks