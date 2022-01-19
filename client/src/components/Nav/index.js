import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ListItemWrapper>
          <ListItem>
            <Link
              style={{ color: 'var(--burnt-sienna-lite)' }}
              to='/orderHistory'
            >
              Order History
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ color: 'white' }}
              to='/'
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </ListItem>
        </ListItemWrapper>
      );
    } else {
      return (
        <ListItemWrapper>
          <LoginListItem>
            <Link style={{ color: 'var(--burnt-sienna-lite)' }} to='/signup'>
              Signup
            </Link>
          </LoginListItem>
          <LoginListItem>
            <Link style={{ color: 'var(--burnt-sienna-lite)' }} to='/login'>
              Login
            </Link>
          </LoginListItem>
        </ListItemWrapper>
      );
    }
  }

  return (
    <LogoContainer>
      <Link
        style={{ color: 'var(--burnt-sienna-lite)', fontSize: '2.25rem' }}
        to='/'
      >
        H | A | L | O
      </Link>

      <ShowNavigation>{showNavigation()}</ShowNavigation>
    </LogoContainer>
  );
}

export default Nav;
