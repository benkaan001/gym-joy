import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import styled from 'styled-components';
import { mobile } from '../mobileScreen';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 50px;
  ${mobile({ flexDirection: 'column' })};
`;

const ImageContainerWrapper = styled.div`
  width: 25%;
  text-align: center;
  padding-top: var(--spacing-one);
  padding-bottom: var(--spacing-one);
  padding-right: var(--spacing-one);
  padding-left: var(--spacing-one);
`;
const ImageContainer = styled.div`
  flex: 1;
  object-fit: cover;
`;
const Image = styled.img`
  width: 100%;

  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 20px;
  color: var(--charcoal);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--white);
  }

  &:hover:active {
    transform: translateY(-1px);
    box-shadow: 0 3.5px 6.5px rgba(0, 0, 0, 0.4);
  }
`;

const Desc = styled.h3`
  margin: 20px 0px 30px;
  ${mobile({ textAlign: 'center' })};
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
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

const OrderHistory = () => {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      {user ? (
        <Container>
          <InfoContainer>
            <Button>
              <Link to='/' style={{ textDecoration: 'none' }}>
                Back to Products
              </Link>
            </Button>
            <Desc>
              Order History for {user.firstName} {user.lastName}
            </Desc>
          </InfoContainer>

          {user.orders.map((order) => (
            <InfoContainer key={order._id}>
              <Price>
                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
              </Price>
              <InfoContainer>
                {order.products.map(({ _id, image, name, price }, index) => (
                  <ImageContainerWrapper key={index}>
                    <ImageContainer key={index}>
                      <Link
                        to={`/products/${_id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Title>{name}</Title>
                        <Image alt={name} src={`/images/${image}`} />
                      </Link>
                    </ImageContainer>

                    <Price>${price}</Price>
                  </ImageContainerWrapper>
                ))}
              </InfoContainer>
            </InfoContainer>
          ))}
        </Container>
      ) : null}
    </>
  );
};

export default OrderHistory;
