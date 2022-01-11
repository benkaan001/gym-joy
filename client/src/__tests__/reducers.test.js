import { reducer } from '../utils/reducers';
// test if reducers are updating the state without altering the orignal state object.

// import actions
import {
  UPDATE_CATEGORIES,
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';

// sample of the global object
const initialState = {
  products: [],
  categories: [{ name: 'Watch' }],
  currentCategory: 'Watch',
};

// test if a product can be added to the products array

test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });
  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: 'Shoes',
  });
  expect(newState.currentCategory).toBe('Shoes');
  expect(initialState.currentCategory).toBe('Watch');
});
