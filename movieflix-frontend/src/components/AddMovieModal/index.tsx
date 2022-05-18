import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Overlay, Card, Body, Footer, Close, Content, Header, Button } from './styles';
import { useTmdb } from '../../hooks/useTmdb';
import { useMovies } from '../../hooks/useMovies';
import loader from '../../assets/loader.svg';

type IModal = {
  show: boolean;
  close(): void;
};

const Modal: React.FC<IModal> = ({ show = false, close }) => {
  const { movie } = useTmdb();
  const { addMovie, error, clearAddMovieError } = useMovies();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const stop = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const { searchMovie, setMovie } = useTmdb();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [overview, setOverview] = useState('');
  const [genre, setGenre] = useState('');

  const debouncedSearch = useRef(
    debounce(async movieName => {
      const search = await searchMovie(movieName);

      setYear(search.year);
      setDirector(search.director);
      setOverview(search.overview);
      setGenre(search.genre);
    }, 500),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleMovieInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      debouncedSearch(event.target.value);
      setName(event.target.value);
      setMovie(prevMovie => ({ ...prevMovie, title: event.target.value }));
    },
    [debouncedSearch, setMovie],
  );

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setYear(event.target.value);
      setMovie(prevMovie => ({ ...prevMovie, year: event.target.value }));
    },
    [setMovie],
  );

  const handleDirectorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setDirector(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, director: event.target.value }));
    },
    [setMovie],
  );

  const handleGenreChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setGenre(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, genre: event.target.value }));
    },
    [setMovie],
  );

  const handleOverviewChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>): void => {
      setOverview(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, overview: event.target.value }));
    },
    [setMovie],
  );

  const handleNewMovie = useCallback(async () => {
    setIsFetching(true);
    const newMovie = await addMovie(movie);
    setIsFetching(false);
    if (!isFetching && newMovie.id) {
      setName('');
      setDirector('');
      setYear('');
      setGenre('');
      setOverview('');
      clearAddMovieError();
      close();
      window.location.reload();
    }
  }, [addMovie, clearAddMovieError, close, isFetching, movie]);

  const handleCloseCall = useCallback((): void => {
    setName('');
    setDirector('');
    setYear('');
    setGenre('');
    setOverview('');
    clearAddMovieError();
    close();
  }, [clearAddMovieError, close]);

  return !show ? null : (
    <Overlay>
      <Card onClick={stop}>
        <Content>
          <Header>
            <Close onClick={handleCloseCall} />
          </Header>
          {isFetching ? (
            <img src={loader} alt='loader' />
          ) : (
            <>
              <Body>
                <div>
                  <h3>Adicionar novo filme</h3>
                  <input type='text' name='name' placeholder='Nome do filme' value={name} onChange={handleMovieInput} />
                  <input
                    type='text'
                    name='director'
                    placeholder='Diretor'
                    value={director}
                    onChange={handleDirectorChange}
                  />
                  <input type='text' name='year' placeholder='Ano' value={year} onChange={handleYearChange} />
                  <input type='text' name='genre' placeholder='Gênero' value={genre} onChange={handleGenreChange} />
                  <textarea name='overview' placeholder='Descrição' value={overview} onChange={handleOverviewChange} />
                </div>
              </Body>
              <Footer>
                {!isFetching && error ? <p>{error}</p> : ''}
                <Button onClick={handleNewMovie}>Cadastrar</Button>
              </Footer>
            </>
          )}
        </Content>
      </Card>
    </Overlay>
  );
};

export default Modal;
