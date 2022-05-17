import React, { FC, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import {
  Logo,
  Header,
  Highlight,
  Container,
  MovieCover,
  Details,
  MovieDescription,
  MovieTitle,
  Status,
  Rate,
  PieText,
  SinopseTitle,
  Description,
  Director,
  DirectorName,
  DirectorLabel,
  Content,
  RemoveButton,
  EditButton,
} from './styles';
import { Chart } from '../../components';
import { useMovies } from '../../hooks/useMovies';

const MovieDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    state: { movie },
  } = useLocation();
  const history = useHistory();
  const { removeMovie } = useMovies();

  const handleRemoveMovie = useCallback(async () => {
    await removeMovie(id);
    history.push('/');
  }, [history, id, removeMovie]);

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Highlight>
        <Details>
          <MovieCover src={process.env.REACT_APP_TMDB_IMAGE_URL + movie.posterPath} />
          <MovieDescription>
            <MovieTitle>{`${movie.title} (${movie.year})`}</MovieTitle>
            <Status>{movie.genre}</Status>
            <Rate>
              <Chart percentage={movie.voteAverage * 10} />
              <PieText>Avaliação dos usuários</PieText>
            </Rate>
            <SinopseTitle>Sinopse</SinopseTitle>
            <Description>{movie.overview}</Description>
            <Director>
              <DirectorName>{movie.director}</DirectorName>
              <DirectorLabel>Director</DirectorLabel>
            </Director>
          </MovieDescription>
        </Details>
      </Highlight>
      <Content>
        <RemoveButton onClick={handleRemoveMovie}>Remover filme</RemoveButton>
        <EditButton>Editar filme</EditButton>
      </Content>
    </Container>
  );
};

export default MovieDetails;
