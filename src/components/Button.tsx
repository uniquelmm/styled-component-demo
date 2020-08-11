import React, { FC } from "react";
import styled, { css } from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 13px 11px;
`;
const ButtonLabel = styled.label`
  color: #737373;
  font-size: 0.8571428571em;
`;
const ButtonInput = styled.input`
  border: none;
`;

const Button: FC = ({}) => {
  return (
    <ButtonContainer>
      <ButtonLabel>Email or mobile phone number</ButtonLabel>
      <ButtonInput></ButtonInput>
    </ButtonContainer>
  );
};
export default Button;
