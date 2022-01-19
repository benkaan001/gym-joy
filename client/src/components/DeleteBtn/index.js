import React from 'react';
import styled from 'styled-components';

const DeleteButton = styled.span`
  cursor: default;
`;

function DeleteBtn(props) {
  return (
    <DeleteButton {...props} role='button' tabIndex='0'>
      ✗
    </DeleteButton>
  );
}

export default DeleteBtn;
