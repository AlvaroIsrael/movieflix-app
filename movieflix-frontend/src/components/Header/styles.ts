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

    button {
      margin-right: 0 !important;
      background: transparent;
      border: 0;

      svg {
        color: #ffffff;
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
`;

export const MenuLink = styled.button<MenuLinkProps>`
  display: inline-block;
  position: relative;
  padding: 0 20px;
  width: fit-content;
  height: 40px;
  cursor: pointer;

  background: #ffffff !important;
  color: var(--anthor-blue-primary);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  border-radius: 4px;

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
