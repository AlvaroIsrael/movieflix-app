import styled from 'styled-components';
import closeButton from '../../assets/Home/closeIcon.svg';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(80, 89, 100, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  height: 560px;
  width: 360px;
  margin: 32px 20px;
  background-color: #ffffff;
  border-radius: 4px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'body'
    'footer';
`;

export const Header = styled.div`
  grid-area: header;
  justify-self: flex-end;
`;

export const Close = styled.button`
  border: 0;
  margin: 10px;
  height: 20px;
  width: 20px;
  background: url(${closeButton}) no-repeat;
  justify-self: center;
  z-index: 99;
`;

export const Body = styled.div`
  grid-area: body;
  height: calc(560px - 120px);
  padding: 20px;

  div {
    input {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      padding: 0 10px;
      margin-bottom: 10px;
    }

    textarea {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      width: 320px;
      max-width: 320px;
      height: 190px;
      max-height: 190px;
      resize: none;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      padding: 10px;
      margin-bottom: 10px;

      ::-webkit-input-placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
      }

      :-ms-input-placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
      }

      :-moz-placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
      }

      ::-moz-placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
      }
    }
  }
`;

export const Footer = styled.div`
  grid-area: footer;
  position: relative;
  height: 80px;
  padding: 20px;
  border-radius: 0 0 4px 4px;
  background-color: var(--anthor-blue-primary);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = styled.button`
  display: inline-block;
  position: relative;
  padding: 0 20px;
  width: fit-content;
  height: 40px;
  cursor: pointer;

  background: #ffffff;
  color: var(--anthor-blue-primary);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  border-radius: 4px;

  transition: color 0.2s;

  & + button {
    margin-left: 16px;
  }

  &:hover {
    transition: background 0.2s ease 0s;
  }

  align-self: center;
`;
