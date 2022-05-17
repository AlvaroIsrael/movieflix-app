import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Body, Container } from './styles';
import { Header, MovieCard } from '../../components';
import { NewMovie, useMovies } from '../../hooks/useMovies';

const Home: FC = () => {
  const { listMovies } = useMovies();
  const [movies, setMovies] = useState<NewMovie[]>([]);

  useEffect(() => {
    const shouldListMovies = async (): Promise<NewMovie[]> => {
      return listMovies({
        page: 1,
        pageLimit: 10,
      });
    };

    shouldListMovies()
      .then(newMovies => {
        setMovies(newMovies);
      })
      .finally();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Body>
          {movies.map(m => (
            <Link
              to={{
                pathname: `/details/${m.id}`,
                state: {
                  movie: m,
                },
              }}
              key={m.id}
            >
              <MovieCard
                key={m.id}
                coverUrl={process.env.REACT_APP_TMDB_IMAGE_URL + m.posterPath}
                title={m.title}
                releaseDate={m.year}
              />
            </Link>
          ))}
        </Body>
      </Container>
    </>
  );
};

export default Home;
