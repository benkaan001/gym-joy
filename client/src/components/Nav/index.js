import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../mobileScreen';

const ListItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-decoration: none;
`;

const ListItem = styled.span`
  margin-right: var(--spacing-one);
  margin-left: var(--spacing-one);
`;
const LoginListItem = styled.span`
  margin-right: var(--spacing-one);
  margin-left: var(--spacing-one);
  margin-top: var(--spacing-two);
  margin-bottom: var(--spacing-two);
  padding-right: var(--spacing-two);
  padding-left: var(--spacing-two);
  text-decoration: none;
  color: white;
  ${mobile({ paddingRight: '0' })};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-right: var(--spacing-one);
  padding-left: var(--spacing-one);
  background-color: var(--charcoal);
`;

const ShowNavigation = styled.nav``;

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ListItemWrapper>
          <ListItem>
            <Link
              style={{
                color: 'var(--burnt-sienna-lite)',
                textDecoration: 'none',
              }}
              to='/orderHistory'
            >
              ORDER HISTORY
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to='/'
              onClick={() => Auth.logout()}
            >
              LOGOUT
            </Link>
          </ListItem>
        </ListItemWrapper>
      );
    } else {
      return (
        <ListItemWrapper>
          <LoginListItem>
            <Link
              style={{
                color: 'var(--burnt-sienna-lite)',
                textDecoration: 'none',
              }}
              to='/signup'
            >
              REGISTER
            </Link>
          </LoginListItem>
          <LoginListItem>
            <Link
              style={{
                color: 'var(--burnt-sienna-lite)',
                textDecoration: 'none',
              }}
              to='/login'
              onClick={() => window.location.replace('/#login')}
            >
              LOGIN
            </Link>
          </LoginListItem>
        </ListItemWrapper>
      );
    }
  }

  return (
    <LogoContainer>
      <Link
        style={{
          color: 'var(--burnt-sienna-lite)',
          fontSize: '2.25rem',
          textDecoration: 'none',
        }}
        to='/'
      >
        H | A | L | O
      </Link>

      <ShowNavigation>{showNavigation()}</ShowNavigation>
    </LogoContainer>
  );
};

export default Nav;
