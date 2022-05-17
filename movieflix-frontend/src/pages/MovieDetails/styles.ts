import styled from 'styled-components';
import logo from '../../assets/Home/logo.svg';
import logoSmall from '../../assets/Home/logoSmall.svg';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto 1fr;
  grid-template-areas:
    'header'
    'highlight'
    'content';

  background: var(--anthor-white);

  overflow-x: hidden;
`;

export const Header = styled.nav`
  grid-area: header;
  height: 80px;
  background: var(--anthor-green-primary);
  margin-bottom: 32px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'logo';

  @media screen and (max-width: 360px) {
    width: 100vw;
  }
`;

export const Logo = styled.div`
  grid-area: logo;
  height: 24px;
  width: 185px;
  margin-left: 112px;

  background: url(${logo}) center no-repeat;
  align-self: center;

  @media screen and (max-width: 360px) {
    background: url(${logoSmall}) center no-repeat;
    margin: 0;
    place-self: center;
  }
`;

export const Highlight = styled.section`
  grid-area: highlight;
  height: fit-content;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'details';

  background: var(--anthor-blue-primary);

  margin-bottom: 40px;
`;

export const Details = styled.div`
  grid-area: details;

  max-width: 1231px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'movieCover movieDescription';

  place-self: center;
`;

export const MovieCover = styled.img`
  grid-area: movieCover;
  height: 600px;
  min-width: 383px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  justify-self: right;
  margin: 72px 0 -50px 0;
`;

export const MovieDescription = styled.div`
  grid-area: movieDescription;

  margin: 72px 0 0 33px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    'movieTitle movieTitle movieTitle'
    'status status status'
    'rate . .'
    'sinopseTitle sinopseTitle sinopseTitle'
    'description description description'
    'director firstCharacter secondCharacter'
    'firstScreenPlay secondScreenPlay .';

  align-self: start;
  justify-self: left;
`;

export const MovieTitle = styled.p`
  grid-area: movieTitle;

  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.005em;
  text-align: left;

  margin-bottom: 8px;

  color: #ffffff;
`;

export const Status = styled.p`
  grid-area: status;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;

  margin-bottom: 16px;

  color: #ffffff;
`;

export const Rate = styled.div`
  grid-area: rate;
  width: 162px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'pieChart pieText';

  align-self: center;
  margin-bottom: 32px;

  color: #ffffff;
`;

export const PieText = styled.p`
  grid-area: pieText;

  height: 40px;
  width: 102px;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;

  place-self: center;
  margin-left: 12px;

  color: #ffffff;
`;

export const SinopseTitle = styled.p`
  grid-area: sinopseTitle;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;

  margin-bottom: 8px;

  color: #ffffff;
`;

export const Description = styled.p`
  grid-area: description;

  max-width: 696px;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.005em;
  text-align: left;

  margin-bottom: 24px;

  color: #ffffff;
`;

export const Director = styled.div`
  grid-area: director;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 20px;
  grid-template-areas:
    'directorName'
    'directorLabel';
`;

export const DirectorName = styled.p`
  grid-area: directorName;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;

  color: #ffffff;
`;

export const DirectorLabel = styled.p`
  grid-area: directorLabel;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;

  color: #ffffff;
`;

export const Content = styled.section`
  grid-area: content;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const RemoveButton = styled.button`
  display: inline-block;
  padding: 0 20px;
  width: fit-content;
  height: 40px;
  cursor: pointer;
  justify-self: flex-end;

  background: #ffffff;
  color: var(--anthor-red-primary);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  border-radius: 4px;

  transition: color 0.2s;

  & + button {
    margin-left: 16px;
  }

  &:hover {
    transition: background 0.2s ease 0s;
  }
`;

export const EditButton = styled.button`
  display: inline-block;
  padding: 0 20px;
  width: fit-content;
  height: 40px;
  cursor: pointer;
  justify-self: flex-end;

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
`;
