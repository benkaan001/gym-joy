import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <div className=' container my-1'>
        <Link to='/login'>← Go to Login</Link>

        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className='flex-row space-between my-2'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              placeholder='firstName'
              name='firstName'
              type='firstName'
              id='firstName'
              onChange={handleChange}
            />
          </div>
          <div className='flex-row space-between my-2'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              placeholder='lastName'
              name='lastName'
              type='lastName'
              id='lastName'
              onChange={handleChange}
            />
          </div>
          <div className='flex-row space-between my-2'>
            <label htmlFor='email'>Email:</label>
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
          <div className='flex-row flex-end'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
