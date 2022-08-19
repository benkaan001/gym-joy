import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

// include value prop just in case additional data needs to be passed into the state.
const StoreProvider = ({ value = [], ...props }) => {
  // state is the most up-to-date version of the global state object
  // dispatch is method being executed to update the state
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// custom React Hook to be used by the components that need the data StoreProvider will provide
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
