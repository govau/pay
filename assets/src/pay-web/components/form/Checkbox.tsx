import * as React from "react";
import styled from "../../styled-components";
import { Field } from "react-final-form";

interface Props {
  label: string;
  name: string;
  value?: string;
  onClick?: () => void;
}

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  margin: 2rem 0;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input[type="checkbox"]:checked + span:after {
    content: "";
    display: block;
    width: 9px;
    height: 16px;
    border: solid ${props => props.theme.colors.black};
    border-radius: 1px;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-left: 8px;
    margin-top: 2px;
  }

  input[type="checkbox"]:focus + span {
    box-shadow: 0 0 0 2pt ${props => props.theme.colors.orange};
    outline: 0;
  }
`;

const Checkmark = styled.span`
  height: 2.8rem;
  min-width: 2.8rem;
  background-color: white;
  border: 2px solid ${props => props.theme.colors.black};
  margin-right: 0.8rem;
`;

const Checkbox: React.FunctionComponent<Props> = ({
  label,
  name,
  value,
  onClick
}) => (
  <Wrapper>
    <Field
      name={name}
      value={value}
      component="input"
      type="checkbox"
      onClick={onClick}
    />
    <Checkmark />
    {label}
  </Wrapper>
);

export default Checkbox;
