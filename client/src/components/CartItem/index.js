import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';
import styled from 'styled-components';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ContainerItem = styled.div``;

const Image = styled.img``;

const StyledCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
`;

const CartItemContent = styled.span`
  cursor: default;
  font-weight: 300;
  font-size: 16px;
`;

const CartItemContentInput = styled.input`
  font-weight: 300;
  font-size: 16px;
  text-align: center;
`;

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });

      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });

      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <Container>
      <ContainerItem>
        <Image src={`/images/${item.image}`} alt='' />
      </ContainerItem>
      <ContainerItem>
        <StyledCartItem>
          <CartItemContent> {item.name}</CartItemContent>
          <CartItemContent> ${item.price}</CartItemContent>
        </StyledCartItem>
        <StyledCartItem>
          <CartItemContentInput
            type='number'
            placeholder='1'
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <CartItemContent>
            <DeleteForeverRoundedIcon
              fontSize='medium'
              onClick={() => removeFromCart(item)}
              style={{
                cursor: 'pointer',
                color: 'var(--burnt-sienna)',
              }}
            />
          </CartItemContent>
        </StyledCartItem>
      </ContainerItem>
    </Container>
  );
};

export default CartItem;
