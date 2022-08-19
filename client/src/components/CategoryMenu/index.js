import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_PRODUCTS,
} from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';
import styled from 'styled-components';
import { mobile, tablet } from '../../mobileScreen';

const Container = styled.div`
  margin: 3px;
  height: 30vh;
  position: relative;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.unsplash.com/photo-1623199648374-a4ff4e14e719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHdvcmtvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=100');
  ${mobile({ height: '15vh' })};
`;
const Info = styled.div`
  flex: 1;
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

const CategoryItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  ${mobile({})};
  ${tablet({})};
`;

const Title = styled.h2`
  color: white;
  padding: 10px;
  font-weight: 400;
  word-spacing: 10px;
  margin-bottom: 20px;
  border-radius: 80%;
  background-color: azure;
  color: var(--sandy-brown);
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: azure;
  word-spacing: 3px;
  color: var(--charcoal);
  border-radius: 80%;
  &:hover {
    background-color: var(--persian-green);
  }
`;

const CategoryMenu = () => {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery,
    //then run dispatch
    if (categoryData) {
      // execute dispatch function with action object indicating the type of action,
      // and the data to set the state for categories
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
      // check if 'loading' is undefined in 'useQuery()'
    } else if (!loading) {
      // get allt he data from the 'categories' store since the user is offline
      idbPromise('categories', 'get').then((categories) => {
        //use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          categories: categories,
        });
      });
    }
  }, [categoryData, dispatch, loading]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <Container>
      <Info>
        <Title id='categories'>CATEGORIES</Title>
        <CategoryItemWrapper>
          {categories.map((item) => (
            <Button
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}
            >
              {item.name}
            </Button>
          ))}
        </CategoryItemWrapper>
      </Info>
    </Container>
  );
};

export default CategoryMenu;
