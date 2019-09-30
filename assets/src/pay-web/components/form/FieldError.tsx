import styled from "../../styled-components";

interface Props {
  id: string;
}

const FieldError = styled.strong.attrs<Props>(props => ({
  id: props.id
}))`
  display: block;
  color: ${props => props.theme.colors.red};
`;

export default FieldError;
