import React, { FC, useCallback } from 'react';
import { Container, Content, Logo, MenuLink } from './styles';
import logo from '../../assets/Home/logo.svg';

const Header: FC = () => {
  const handleNewMovie = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('new movie');
  }, []);

  return (
    <Container>
      <Content>
        <Logo>
          <img src={logo} alt='movie flix' />
        </Logo>
        <nav>
          <MenuLink active onClick={handleNewMovie}>
            Novo Filme
          </MenuLink>
        </nav>
      </Content>
    </Container>
  );
};

export default Header;
