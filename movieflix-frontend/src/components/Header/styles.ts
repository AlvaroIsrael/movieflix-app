import styled from 'styled-components';

type MenuLinkProps = {
  active?: boolean;
};

export const Container = styled.header`
  height: 80px;
  background: var(--anthor-green-primary);
  margin-bottom: 32px;
`;

export const Content = styled.div`
  max-width: 1280px;
  height: 80px;
  margin: 0 auto;
  padding: 0 32px;

  display: flex;
  align-items: center;

  nav {
    margin-left: 80px;
    height: 80px;
    display: flex;
  }
`;

export const MenuLink = styled.button<MenuLinkProps>`
  display: inline-block;
  position: relative;
  padding: 0 8px;
  width: 160px;
  height: 40px;
  cursor: pointer;

  background: #ffffff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  border-radius: 4px;
  color: var(${props => (props.active ? '--white' : '--gray-300')});
  font-weight: ${props => (props.active ? 'bold' : 'normal')};

  transition: color 0.2s;

  & + button {
    margin-left: 16px;
  }

  &:hover {
    transition: background 0.2s ease 0s;
  }

  align-self: center;
`;

export const Logo = styled.div`
  width: 185px;
  height: 24px;
  position: relative;
  align-self: center;
`;
