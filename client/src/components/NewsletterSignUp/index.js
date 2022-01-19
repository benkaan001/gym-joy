import { Send } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile, tablet } from '../../mobileScreen';
// import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Container = styled.div`
  height: 60vh;
  background-color: var(--sandy-brown);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: '40px', fontWeight: 600 })}
  ${tablet({ fontSize: '60px' })}
`;

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: 'center', fontSize: '18px' })};
  ${tablet({ fontSize: '20px' })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--gray-4);
  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  border: none;
  flex: 1;
  background-color: var(--persian-green);
  color: white;
  margin: -2px;
`;

const NewsletterSignUp = () => {
  return (
    <Container>
      <Title>Classes and Events</Title>
      <Description>
        {' '}
        Sign up now to get notifications about the upcoming community events and
        classes.
      </Description>
      <InputContainer>
        <Input placeholder='enter your email here' />
        {/* <MailchimpSubscribe url={process.env.MAILCHIMP_URL} /> */}
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsletterSignUp;
