import React, { FC, HTMLAttributes } from 'react';
import { CircularChart, Circle, PercentageText } from './styles';

type ChartProps = HTMLAttributes<HTMLDivElement> & {
  percentage?: number;
  chartHexColor?: string;
};

const Chart: FC<ChartProps> = ({ percentage, chartHexColor }: ChartProps) => {
  return (
    <CircularChart viewBox='0 0 36 36'>
      <Circle
        chartHexColor={chartHexColor}
        className='circle'
        strokeDasharray={`${percentage}, 100`}
        d='M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831'
      />
      <PercentageText x='18' y='21' chartHexColor={chartHexColor}>
        {percentage}%
      </PercentageText>
    </CircularChart>
  );
};

Chart.defaultProps = {
  percentage: 0.0,
  chartHexColor: '#96D518',
};

export default Chart;
