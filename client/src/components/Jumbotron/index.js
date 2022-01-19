import React from 'react';
import styled from 'styled-components';

const JumbotronContainer = styled.div`
  height: 560;
  clear: both;
  padding-top: 120;
  text-align: center;
`;

const Jumbotron = ({ children }) => {
  return <JumbotronContainer>{children}</JumbotronContainer>;
};

export default Jumbotron;
