import React, { useCallback } from 'react';
import { Overlay, Card, Body, Footer, Close, Content, Header, Button } from './styles';

type IModal = {
  children: React.ReactNode;
  show: boolean;
  close(): void;
};

const Modal: React.FC<IModal> = ({ children, show = false, close }) => {
  const stop = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleNewMovie = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('new movie');
  }, []);

  return !show ? null : (
    <Overlay>
      <Card onClick={stop}>
        <Content>
          <Header>
            <Close onClick={close} />
          </Header>
          <Body>{children}</Body>
          <Footer>
            <Button onClick={handleNewMovie}>Cadastrar</Button>
          </Footer>
        </Content>
      </Card>
    </Overlay>
  );
};

export default Modal;
