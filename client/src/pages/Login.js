import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { mobile, tablet } from '../mobileScreen';

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
  ${mobile({ height: '60vh' })}
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ width: '100%' })}
  ${tablet({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 2px;
  ${mobile({ textAlign: 'center' })}
`;

const FormWrapper = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: var(--persian-green);
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  ${tablet({ width: '80%', padding: '5px 10px' })}
`;
const Link1 = styled.p`
  margin: 5px 5px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  ${mobile({ margin: '0px 2px' })};
  ${tablet({ margin: '0px 15px' })}
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
      <Wrapper>
        <Title id='login'> LOGIN TO YOUR ACCOUNT</Title>
        <FormWrapper>
          <Form onSubmit={handleFormSubmit}>
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
            {error ? (
              <div>
                <p className='error-text'>
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}
            <Button>SIGN IN</Button>
          </Form>
        </FormWrapper>
        <Link to='/signup'>
          <Link1> CREATE A HALO ACCOUNT</Link1>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default Login;
