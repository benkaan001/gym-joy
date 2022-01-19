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
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Announcement1 />
            <Nav>
              <Cart />
            </Nav>
            <HeroSlides />
            <VisualCategories />
            <div className='body'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/orderHistory' component={OrderHistory} />
                <Route exact path='/products/:id' component={Detail} />
                <Route exact path='/success' component={Success} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <NewsletterSignUp />
            <Footer1 />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
