import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action is updateProducts, return a new state object with updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return { ...state, categories: [...action.categories] };
    case UPDATE_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.currentCategory };
    // if action type is none of these, do not update the state
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
