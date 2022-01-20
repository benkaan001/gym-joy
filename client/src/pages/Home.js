import React from 'react';
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import styled from 'styled-components';

const Container = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Home = () => {
  return (
    <Container>
      <CategoryMenu />
      <ProductList />
      <Cart />
    </Container>
  );
};

export default Home;
