import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// use StoreProvider to wrap all components to become children of StoreProvider
import { StoreProvider } from './utils/GlobalState';

import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success';
import Announcement1 from './components/Announcement1';
import Footer1 from './components/Footer1';
import HeroSlides from './components/HeroSlides';

import VisualCategories from './components/VisualCategories';
import NewsletterSignUp from './components/NewsletterSignUp';
import Cart from './components/Cart';
import styled from 'styled-components';
import ScrollToTop from './components/ScrollToTop';

const Wrapper = styled.div``;

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop />
        <Wrapper>
          <StoreProvider>
            <Announcement1 />
            <Nav>
              <Cart />
            </Nav>
            <HeroSlides />
            <VisualCategories />
            <Wrapper>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/orderHistory' component={OrderHistory} />
                <Route exact path='/products/:id' component={SingleProduct} />
                <Route exact path='/success' component={Success} />
                <Route component={ErrorPage} />
              </Switch>
            </Wrapper>
            <NewsletterSignUp />
            <Footer1 />
          </StoreProvider>
        </Wrapper>
      </Router>
    </ApolloProvider>
  );
};

export default App;
