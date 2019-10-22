import styled from "../../styled-components";

export interface Props<FieldValue = string> {
  label: string;
  name: string;
  value?: FieldValue;
  // First indicates this is the first radio in a set. The first radio in the
  // set should be in charge of rendering the error.
  first?: boolean;
}

export const Wrapper = styled.label`
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

  input[type="radio"]:checked + span:after {
    content: "";
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background: ${props => props.theme.colors.black};
    border-radius: 1em;
    margin-left: 3px;
    margin-top: 3px;
  }

  input[type="radio"]:focus + span {
    box-shadow: 0 0 0 2pt ${props => props.theme.colors.orange};
    outline: 0;
  }
`;

export const Checkmark = styled.span`
  height: 2.8rem;
  min-width: 2.8rem;
  background-color: white;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 1em;
  margin-right: 0.8rem;
`;
