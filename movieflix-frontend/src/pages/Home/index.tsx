import React, { FC } from 'react';
import { Container, Body } from './styles';
import { Header, MovieCard } from '../../components';
import movie from '../../assets/Home/movie1.svg';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Body>
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
          <MovieCard coverUrl={movie} title='Oi, Alberto' releaseDate='12 NOV 2021' />
        </Body>
      </Container>
    </>
  );
};

export default Home;
