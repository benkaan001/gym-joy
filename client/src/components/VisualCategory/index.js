import React from 'react';
import styled from 'styled-components';
import { mobile, tablet } from '../../mobileScreen';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: '35vh' })};
  ${tablet({ height: '50vh' })};
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  word-spacing: 3px;
  color: black;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--persian-green);
  }

  &:hover:active {
    transform: translateY(-1px);
    box-shadow: 0 3.5px 6.5px rgba(0, 0, 0, 0.4);
  }
`;

const VisualCategory = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button onClick={() => window.location.replace('/#categories')}>
          SHOP WHAT'S NEW
        </Button>
      </Info>
    </Container>
  );
};

export default VisualCategory;
