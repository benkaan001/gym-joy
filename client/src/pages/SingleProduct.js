import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_PRODUCTS,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from '../utils/actions';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import Cart from '../components/Cart';

import { idbPromise } from '../utils/helpers';
import styled from 'styled-components';
import { mobile } from '../mobileScreen';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding: 50px;
  ${mobile({ flexDirection: 'column' })};
`;
const ImageContainer = styled.div`
  flex: 1;
  object-fit: cover;
  ${mobile({ textAlign: 'center' })};
`;
const Image = styled.img`
  width: 50%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 50px;
  ${mobile({ marginBottom: '10px' })};
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 30px;
`;

const Desc = styled.p`
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

const Spinner = styled.img``;

const Detail = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      // get all he data from the 'products' store since the user is offline
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from IndexedDB
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, dispatch, id, loading]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // use existing item data and increment purchaseQuantity value by one
      // when updating quantity
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    // upon removal from cart, delete the item from IndexedDB using
    // the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <Container>
          <InfoContainer>
            <ButtonWrapper>
              <Button>
                <Link
                  to='/'
                  style={{ textDecoration: 'none', textTransform: 'uppercase' }}
                >
                  Back to Products
                </Link>
              </Button>
            </ButtonWrapper>

            <Title>{currentProduct.name}</Title>

            <Desc>{currentProduct.description}</Desc>

            <Price>Price: ${currentProduct.price}</Price>
            <ButtonWrapper>
              <Button onClick={addToCart}>Add to Cart</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                disabled={!cart.find((p) => p._id === currentProduct._id)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </Button>
            </ButtonWrapper>
          </InfoContainer>
          <ImageContainer>
            <Image
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
          </ImageContainer>
        </Container>
      ) : null}
      {loading ? <Spinner src={spinner} alt='loading' /> : null}
      <Cart />
    </>
  );
};

export default Detail;
