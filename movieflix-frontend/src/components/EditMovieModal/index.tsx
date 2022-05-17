import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom';
import { Overlay, Card, Body, Footer, Close, Content, Header, Button } from './styles';
import { useTmdb } from '../../hooks/useTmdb';
import { NewMovie, useMovies } from '../../hooks/useMovies';
import loader from '../../assets/loader.svg';

type IModal = {
  show: boolean;
  close(): void;
};

const EditMovieModal: React.FC<IModal> = ({ show = false, close }) => {
  const history = useHistory();
  const { error, clearAddMovieError, listMovies, listOneMovie, editMovie } = useMovies();

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
  const [currentMovie, setCurrentMovie] = useState('Selecione um filme');

  const movieInitialState = {
    id: 0,
    tmdbId: 0,
    backdropPath: '',
    genre: '',
    director: '',
    title: '',
    overview: '',
    posterPath: '',
    year: '',
    voteAverage: 0,
    voteCount: 0,
  };

  const [movieToBeEdited, setMovieToBeEdited] = useState<NewMovie>(movieInitialState);

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
      setMovieToBeEdited(prevMovie => ({ ...prevMovie, title: event.target.value }));
    },
    [debouncedSearch, setMovie],
  );

  const handleYearChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setYear(event.target.value);
      setMovie(prevMovie => ({ ...prevMovie, year: event.target.value }));
      setMovieToBeEdited(prevMovie => ({ ...prevMovie, year: event.target.value }));
    },
    [setMovie],
  );

  const handleDirectorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setDirector(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, director: event.target.value }));
      setMovieToBeEdited(prevMovie => ({ ...prevMovie, director: event.target.value }));
    },
    [setMovie],
  );

  const handleGenreChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setGenre(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, genre: event.target.value }));
      setMovieToBeEdited(prevMovie => ({ ...prevMovie, genre: event.target.value }));
    },
    [setMovie],
  );

  const handleOverviewChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>): void => {
      setOverview(event.currentTarget.value);
      setMovie(prevMovie => ({ ...prevMovie, overview: event.target.value }));
      setMovieToBeEdited(prevMovie => ({ ...prevMovie, overview: event.target.value }));
    },
    [setMovie],
  );

  const handleMovieEditing = useCallback(async () => {
    setIsFetching(true);
    const newMovie = await editMovie(movieToBeEdited);
    setIsFetching(false);
    if (!isFetching && newMovie.id) {
      setName('');
      setDirector('');
      setYear('');
      setGenre('');
      setOverview('');
      clearAddMovieError();
      close();
      history.push(`/details/${newMovie.id}`, { movie: newMovie });
    }
  }, [editMovie, movieToBeEdited, isFetching, clearAddMovieError, close, history]);

  const handleCloseCall = useCallback((): void => {
    setName('');
    setDirector('');
    setYear('');
    setGenre('');
    setOverview('');
    clearAddMovieError();
    setCurrentMovie('Selecione um filme');
    close();
  }, [clearAddMovieError, close]);

  const [movieList, setMovieList] = useState<NewMovie[]>();

  const loadMovies = useCallback(async () => {
    const movies = await listMovies({ page: 1, pageLimit: 10 });
    if (movies.length > 0) {
      setMovieList(movies);
    }
  }, [listMovies]);

  const handleSelectionChange = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      setCurrentMovie(event.target.value);
      const movieToEdit = await listOneMovie(event.target.value);
      setName(movieToEdit.title);
      setDirector(movieToEdit.director);
      setYear(movieToEdit.year);
      setGenre(movieToEdit.genre);
      setOverview(movieToEdit.overview);
      setMovieToBeEdited(movieToEdit);
    },
    [listOneMovie],
  );

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
                  <h3>Editar filme</h3>
                  <select value={currentMovie} onClick={loadMovies} onChange={handleSelectionChange}>
                    <option value=''>Selecione um filme</option>
                    {movieList &&
                      movieList.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.title}
                        </option>
                      ))}
                  </select>
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
                <Button onClick={handleMovieEditing}>Editar</Button>
              </Footer>
            </>
          )}
        </Content>
      </Card>
    </Overlay>
  );
};

export default EditMovieModal;
