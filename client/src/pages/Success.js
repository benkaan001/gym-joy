import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
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

const Header2 = styled.h2`
  font-weight: 400;
  ${mobile({ fontSize: '16px' })};
`;

const Header3 = styled.h3`
  font-weight: 400;
  ${mobile({ fontSize: '14px' })};
`;

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 4000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Container>
        <Header>Success!</Header>
        <Header2>Thank you for your purchase!</Header2>
        <Header3>You will now be redirected to the home page now</Header3>
      </Container>
    </div>
  );
}

export default Success;
