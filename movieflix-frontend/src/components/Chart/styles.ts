import styled from 'styled-components';
import { HTMLAttributes } from 'react';

export const CircularChart = styled.svg`
  display: block;
  margin: 10px auto;
  width: 60px;
  height: 60px;
  border-radius: 100px;

  background: rgba(255, 255, 255, 0.1);
`;

type PathProps = HTMLAttributes<SVGPathElement> & {
  chartHexColor?: string;
};

export const Circle = styled.path<PathProps>`
  stroke: ${props => (props.chartHexColor ? props.chartHexColor : '#14ff00')};
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`;

export const PercentageText = styled.text<PathProps>`
  fill: ${props => (props.chartHexColor ? props.chartHexColor : '#14ff00')};

  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.005em;

  text-anchor: middle;
`;
