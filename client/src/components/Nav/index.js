import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className='flex-row'>
          <li className='mx-1'>
            <Link to='/orderHistory'>Order History</Link>
          </li>
          <li className='mx-1'>
            <a href='/' onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='flex-row'>
          <span className='mx-1 my-2 px-2'>
            <Link to='/signup'>Signup</Link>
            {/* <Link to='/signup'>
              <Button>Signup</Button>
            </Link> */}
          </span>
          <span className='mx-1 my-2 px-2'>
            <Link to='/login'>Login</Link>
          </span>
        </ul>
      );
    }
  }

  return (
    <header className='flex-row px-1 navbar'>
      <h1>
        <Link to='/'>H-A-L-O</Link>
        {/* <Button variant='contained'>Contained</Button> */}
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
