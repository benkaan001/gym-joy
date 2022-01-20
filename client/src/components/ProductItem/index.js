import React from 'react';
import { Link } from 'react-router-dom';

import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';
import styled from 'styled-components';
import { mobile } from '../../mobileScreen';

const ItemContainer = styled.div`
  width: 25%;
  text-align: center;
  padding-right: var(--spacing-one);
  padding-left: var(--spacing-one);
  padding-top: var(--spacing-one);
  padding-bottom: var(--spacing-one);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ height: '40vh' })};
`;

const ItemImage = styled.img`
  max-width: 75%;
  ${mobile({ maxWidth: '100%' })};
`;

const ItemName = styled.span`
  color: darkslategray;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background-color: var(--persian-green);
    color: white;
  }

  ${mobile({ fontSize: '14px' })};
`;
const Button = styled.button`
  padding: 10px;
  border: 2px solid var(--persian-green);
  background-color: white;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--persian-green);
  }

  &:hover:active {
    transform: translateY(-1px);
    box-shadow: 0 3.5px 6.5px rgba(0, 0, 0, 0.4);
  }
  ${mobile({ padding: '0', fontSize: '14px' })};
`;
const ItemPriceWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 300;
  ${mobile({ padding: '5px' })};
`;
const ItemPrice = styled.span``;

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <ItemContainer>
      <ItemImage alt={name} src={`/images/${image}`} />
      <Link to={`/products/${_id}`} style={{ textDecoration: 'none' }}>
        <ItemName>{name}</ItemName>
      </Link>
      <ItemPriceWrapper>
        <ItemPrice>${price}</ItemPrice>
      </ItemPriceWrapper>
      <Button onClick={addToCart}>ADD TO CART</Button>
    </ItemContainer>
  );
}

export default ProductItem;
