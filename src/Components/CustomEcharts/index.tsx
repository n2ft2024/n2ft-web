import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export default function CustomEcharts(){
  const myChart = useRef<any>()
  useEffect(()=>{
    window.addEventListener('resize', function() {
      myChart.current && myChart.current.resize();
    });
    const echartsEle = document.getElementById('echartsID')
    if (echartsEle){
      myChart.current = echarts.init(echartsEle);
      var option = {
        title: {
          text: 'ECharts',
          link:'https://echarts.apache.org/zh/option.html#title',
          textStyle:{
            color:'yellow',
            fontWeight:'bold',
            fontSize:24,
            lineHeight:40,
          },
          subtext:'',
          sublink:'https://echarts.apache.org/zh/option.html#title',
          left:'49.5%',
          top:"3%",
          textAlign:'center',
          backgroundColor:'blue'
          // show:false
        },

        legend: {
          data: [''],
          show:true,
          formatter:'Legend {name}',
          // formatter: function (name) {
          //   return 'Legend ' + name;
          // }
          textStyle:{
            color:'purple',
            backgroundColor:'green'
          }
        },


        xAxis: {
          data: [''],
          name:'X',
          nameLocation:'start',
          nameTextStyle:{
            color:'yellow'
          },
          nameGap:20,
          // min:1,
          // max:100
        },

        yAxis: {
          name:'Y',
          nameLocation:'start',
          nameTextStyle:{
            color:'blue'
          },
          nameGap:20,
          axisLine:{
            show:true
          },
          axisTick:{

          }
          // nameRotate:90
        },


        tooltip: {
          axisPointer:{
            type:'cross',
            label:{
              show:true
            }
          },
          backgroundColor:'green',
          textStyle:{
            color:'red'
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);',
          valueFormatter: (value:any) => '$' + value.toFixed(2)
        },

        toolbox:{
          show:true
        },

        series: [
          {
            name: 'current',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            /**https://echarts.apache.org/zh/option.html#series-bar.itemStyle */
            itemStyle:{
              color:'#f5f5',
              borderColor:'#f9f9f9',
              borderRadius: [5, 5, 0, 0]
            },
            clip:false,
            markLine: {
              lineStyle: { width: 2 },
              symbol: "none",

              data: [{
                  name: 'line',
                  yAxis: 32,
                  lineStyle: { color: "#FFAE00", type:'solid' },
                  label:{
                    position:'start',
                    show:true
                  },
                },
                {
                  name: '',
                  yAxis: 17,
                  lineStyle: { color: "#FF4A00", type:'solid' },
                }
              ]
            }
          }
        ],
        backgroundColor:'red',
      };
      // @ts-ignore
      myChart.current.setOption(option);
    }
  },[])

  return <div id={'echartsID'} style={{width:'100%',height:600}}/>
}