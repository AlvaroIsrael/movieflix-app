import React, { FC, useCallback, useState } from 'react';
import { Container, Content, Logo, MenuLink } from './styles';
import logo from '../../assets/Home/logo.svg';
import { AddMovieModal } from '../index';

const Header: FC = () => {
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
