import React from 'react';
import styled from 'styled-components';

import { mobile } from '../mobileScreen';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 60vh;
  ${mobile({ height: '30vh' })};
`;
const Header = styled.h1`
  font-weight: 400;
  ${mobile({ fontSize: '20px' })};
`;
const Emoji = styled.span``;

const ErrorPage = () => {
  return (
    <Container>
      <Header>Oops, that page does not exist...</Header>
      <Header>
        <Emoji role='img' aria-label='Face With Rolling Eyes Emoji'>
          🙄
        </Emoji>
      </Header>
    </Container>
  );
};

export default ErrorPage;
