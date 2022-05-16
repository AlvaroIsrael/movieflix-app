import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { Container, Content, Logo, MenuLink } from './styles';
import logo from '../../assets/Home/logo.svg';
import { Modal } from '../index';
import { useTmdb } from '../../hooks/useTmdb';

const Header: FC = () => {
  const { movies, isFetching, hasMovies, hasError, searchMovie } = useTmdb();

  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const [year, setYear] = useState('');
  const [overview, setOverview] = useState('');

  const debouncedSearch = useRef(
    debounce(async movieName => {
      const search = await searchMovie(movieName);
      if (search.results.length > 0) {
        setYear(search.results[0].release_date.split('-')[0]);
        setOverview(search.results[0].overview);
      }
    }, 500),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleMovieInput = (event: ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(event.currentTarget.value);
  };

  const handleYearChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setYear(event.currentTarget.value);
  }, []);

  const handleOverviewChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>): void => {
    setOverview(event.currentTarget.value);
  }, []);

  return (
    <Container>
      <Modal show={show} close={handleClose}>
        <div>
          <input type='text' name='name' placeholder='Nome do filme' onChange={handleMovieInput} />
          <input type='text' name='director' placeholder='Diretor' />
          <input type='text' name='year' placeholder='Ano' value={year} onChange={handleYearChange} />
          <input type='text' name='genre' placeholder='Gênero' />
          <textarea name='overview' placeholder='Descrição' value={overview} onChange={handleOverviewChange} />
        </div>
      </Modal>
      <Content>
        <Logo>
          <img src={logo} alt='movie flix' />
        </Logo>
        <nav>
          <MenuLink active onClick={handleShow}>
            Novo Filme
          </MenuLink>
        </nav>
      </Content>
    </Container>
  );
};

export default Header;
