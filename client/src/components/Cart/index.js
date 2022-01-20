import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './Cart.css';

import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';

import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';

import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import {
  CloseOutlined,
  ShoppingCartOutlined,
  ShoppingBasket,
} from '@material-ui/icons';

import { mobile } from '../../mobileScreen';
import { Link } from 'react-router-dom';

const ShoppingBagClosed = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 2%;
  right: 1%;
  font-size: 2rem;
  cursor: pointer;
  background-color: var(--secondary);
  border-radius: 50%;
  padding: 0.25rem;
  width: 50px;
  height: 50px;
  ${mobile({ position: 'relative', margin: '0 auto' })}
`;

const CartItemWrapper = styled.div``;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  border-bottom: 1px solid var(--dark);
  padding-bottom: 0.5rem;
  margin: 1rem 0;
  font-weight: 300;
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--charcoal);
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

const CheckoutTotal = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  justify-content: space-between;
`;

const CheckoutTotalTitle = styled.h4`
  font-weight: 300;
  font-size: 22px;
`;

const CheckoutTotalTitleInactive = styled.button`
  font-size: 14px;
  width: 100%;
  color: white;
  display: inline-block;
  padding: 15px 30px;
  margin-bottom: 10px;
  margin-top: 5px;
  transition: all 0.2s;
  background-color: var(--persian-green);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:hover:active {
    transform: translateY(-1px);
    box-shadow: 0 3.5px 6.5px rgba(0, 0, 0, 0.4);
  }
`;

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const Cart = () => {
  const [state, dispatch] = useStoreContext();
  // console.log(state);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });
    getCheckout({
      variables: { products: productIds },
    });
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  if (!state.cartOpen) {
    return (
      <ShoppingBagClosed onClick={toggleCart}>
        <ShoppingBasket fontSize='medium' />
      </ShoppingBagClosed>
    );
  }
  return (
    <div className='cart'>
      <div className='close' onClick={toggleCart}>
        <CloseOutlined />
      </div>
      <CartTitle>Shopping Cart</CartTitle>
      {state.cart.length ? (
        <CartItemWrapper>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <CheckoutTotal>
            <CheckoutTotalTitle>Total: ${calculateTotal()}</CheckoutTotalTitle>
          </CheckoutTotal>
        </CartItemWrapper>
      ) : (
        <ShoppingCartOutlined />
      )}
      {Auth.loggedIn() ? (
        <CheckoutButton onClick={submitCheckout}>CheckOut</CheckoutButton>
      ) : (
        <CheckoutTotalTitleInactive>
          <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
            LogIn to Checkout
          </Link>
        </CheckoutTotalTitleInactive>
      )}
    </div>
  );
};

export default Cart;
