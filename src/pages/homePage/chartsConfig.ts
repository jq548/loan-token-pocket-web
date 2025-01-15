export const circleBarConfig = () => {
  return {
    title: [
      {
        text: '5.07%',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: '14',
          color: '#1EBE70',
          fontWeight: '600',
        },
      },
    ],
    polar: {
      radius: ['72%', '92%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 100,
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '',
        type: 'bar',
        roundCap: true,
        barWidth: 160,
        showBackground: true,
        backgroundStyle: {
          color: '#F3F5F6',
        },
        data: [5.07],
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: '#1EBE70',
          },
        },
      },
    ],
  };
};

export const lineConfig = () => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '14%',
      left: '10%',
      right: '8%',
      bottom: '24%',
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '2019-01',
          '2019-02',
          '2019-03',
          '2019-04',
          '2019-05',
          '2019-06',
        ],
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#A1AAB3',
            fontSize: 12,
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitNumber: 4,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#CFDAE6',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#333',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#A1AAB3',
            fontSize: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Borrow',
        type: 'line',
        data: [23, 60, 20, 36, 23, 85],
        lineStyle: {
          normal: {
            width: 3,
            color: '#FA9825',
            shadowColor: '#51300A22',
            shadowBlur: 12,
            shadowOffsetY: 20,
          },
        },
        symbol: 'none',
        smooth: true,
      },
    ],
  };
};
