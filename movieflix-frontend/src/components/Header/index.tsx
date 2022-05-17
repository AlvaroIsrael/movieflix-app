import React, { FC, useCallback, useState } from 'react';
import { FiPower } from 'react-icons/all';
import { Container, Content, Logo, MenuLink } from './styles';
import logo from '../../assets/Home/logo.svg';
import { AddMovieModal } from '../index';
import { useAuth } from '../../hooks/useAuth';

const Header: FC = () => {
  const { signOut } = useAuth();
  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <Container>
      <AddMovieModal show={show} close={handleClose} />
      <Content data-testid='content'>
        <Logo>
          <img data-testid='logo' src={logo} alt='movie flix' />
        </Logo>
        <nav>
          <MenuLink data-testid='newMovieButton' active onClick={handleShow}>
            Novo Filme
          </MenuLink>
          <button type='button' onClick={signOut}>
            <FiPower />
          </button>
        </nav>
      </Content>
    </Container>
  );
};

export default Header;
