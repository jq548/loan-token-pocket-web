export const circleBarConfig = () => {
  return {
    title: [
      {
        text: '80%',
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
        data: [80],
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
