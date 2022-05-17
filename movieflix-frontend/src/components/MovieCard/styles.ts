import styled from 'styled-components';

export const Card = styled.div`
  display: grid;
  cursor: pointer;
  overflow: hidden;

  grid-template-columns: 176px;
  grid-template-rows: 264px 32px 24px;
  grid-template-areas:
    'cover'
    'title'
    'releaseDate';

  @media screen and (max-width: 360px) {
    grid-template-columns: 156px;
    grid-template-rows: 232px 32px 24px;
  }
`;

export const Cover = styled.img`
  grid-area: cover;
  // width: 176px;
  height: 264px;

  box-sizing: border-box;
  border-radius: 4px;

  @media screen and (max-width: 360px) {
    width: 156px;
    height: 232px;
  }
`;

export const Title = styled.p`
  grid-area: title;
  white-space: nowrap;

  margin-top: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;

  color: var(--anthor-white);

  @media screen and (max-width: 360px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const ReleaseDate = styled.p`
  grid-area: releaseDate;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  text-transform: uppercase;

  color: var(--anthor-white);

  @media screen and (max-width: 360px) {
    font-size: 12px;
    line-height: 18px;
  }
`;
