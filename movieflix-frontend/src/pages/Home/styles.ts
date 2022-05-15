import styled from 'styled-components';

export const Container = styled.section`
  min-height: calc(100vh - 80px); /* 80px = header height */
`;

export const Body = styled.div`
  max-width: 1280px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 32px;

  height: fit-content;
  column-gap: 32px;
  row-gap: 32px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  align-self: start;
  justify-self: center;

  overflow-x: hidden;
`;
