import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

import { idbPromise } from '../../utils/helpers';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there is data to be stored
    if (data) {
      // store this data in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      // also save each product to IndexedDb using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // check if 'loading' is undefined in 'useQuery()'
    } else if (!loading) {
      // get allt he data from the 'products' store since the user is offline
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, dispatch, loading]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className='my-2'>
      {/* <h2>Our Products:</h2> */}
      {state.products.length ? (
        <div className='flex-row'>
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt='loading' /> : null}
    </div>
  );
}

export default ProductList;
