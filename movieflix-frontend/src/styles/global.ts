import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
    --anthor-white: #ffffff;
    --anthor-gray-primary: #7A7A7A;
    --anthor-gray-secondary: #54595F;
    --anthor-green-primary: #96D518;
    --anthor-green-secondary: #61CE70;
    --anthor-blue-primary: #00294E;
    --anthor-blue-secondary: #6EC1E4;
  }

  body {
    background: var(--anthor-gray-secondary);
    color: var(--anthor-gray-primary);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    border-width: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
