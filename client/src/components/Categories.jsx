import styled from 'styled-components';
import React from 'react';
import { categories } from '../data';
import Category from './Category';
import { mobile, tablet } from '../mobileScreen';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: '0px', flexDirection: 'column' })};
  ${tablet({ flexDirection: 'column', padding: '0px' })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <Category item={item} key={item.id}></Category>
      ))}
    </Container>
  );
};

export default Categories;
