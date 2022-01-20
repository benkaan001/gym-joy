import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import styled from 'styled-components';

import { mobile, tablet } from '../mobileScreen';

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
  ${mobile({ height: '60vh' })}
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 70%;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${mobile({ width: '95%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Disclosure = styled.span`
  font-size: 12px;
  margin: 30px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px 15px;
  margin: 10px 0px 5px;
  background-color: var(--persian-green);
  display: flex;
  justify-content: center;
  color: white;
  cursor: pointer;
`;

const Link1 = styled.p`
  margin: 5px 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ margin: '0px 2px' })};
  ${tablet({ margin: '0px 15px' })}
`;

const Signup = (props) => {
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
      <Wrapper>
        <Title> CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleFormSubmit}>
          <Input
            placeholder='firstName'
            name='firstName'
            type='firstName'
            id='firstName'
            onChange={handleChange}
          />
          <Input
            placeholder='lastName'
            name='lastName'
            type='lastName'
            id='lastName'
            onChange={handleChange}
          />
          <Input
            placeholder='email@gmail.com'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
          <Input
            placeholder='password'
            name='password'
            type='password'
            id='pwd'
            onChange={handleChange}
          />

          <Button type='submit'>CREATE</Button>
        </Form>
        <Link to='/login'>
          <Link1> LOGIN TO YOUR HALO ACCOUNT</Link1>
        </Link>
        <Disclosure>
          Halo will use information you submit (including identifiers,
          commercial information, and internet or other electronic network
          activity information) to fulfill this request. To learn more, see our
          <b> privacy policy</b> and <b>terms of use</b>.
        </Disclosure>
      </Wrapper>
    </Container>
  );
};

export default Signup;
