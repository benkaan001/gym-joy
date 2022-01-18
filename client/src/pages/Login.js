import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { mobile } from '../mobileScreen';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_960_720.jpg')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container>
      <div className='container my-1'>
        <Link to='/signup'>← Go to Signup</Link>

        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='flex-row space-between my-2'>
            <label htmlFor='email'>Email address:</label>
            <input
              placeholder='email@gmail.com'
              name='email'
              type='email'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div className='flex-row space-between my-2'>
            <label htmlFor='pwd'>Password:</label>
            <input
              placeholder='******'
              name='password'
              type='password'
              id='pwd'
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className='error-text'>
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className='flex-row flex-end'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;
