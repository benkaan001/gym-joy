import styled from 'styled-components';
import React from 'react';
import { categories } from '../../data';
import VisualCategory from '../VisualCategory';
import { mobile, tablet } from '../../mobileScreen';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: '0px', flexDirection: 'column' })};
  ${tablet({ flexDirection: 'column', padding: '0px' })}
`;

const VisualCategories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <VisualCategory item={item} key={item.id}></VisualCategory>
      ))}
    </Container>
  );
};

export default VisualCategories;
