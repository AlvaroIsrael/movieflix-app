import styled, { css } from 'styled-components';
import { Tooltip } from '../index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #00294e;
  color: #000;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.hasError &&
    css`
      border-color: #a90f27;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #00294e;
      border-color: #00294e;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #00294e;
    `}
  input {
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #00294e;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #a90f27;
    color: #fff;

    &::before {
      border-color: #a90f27 transparent;
    }
  }
`;
