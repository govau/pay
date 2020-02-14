import * as React from "react";

import spacing from "../spacing";
import styled from "../../styled-components";

const StyledFieldset = styled.fieldset`
  * + & {
    margin-top: ${spacing.small};
  }
`;

// Same as <Label />
const Legend = styled.fieldset`
  font-weight: 700;
  display: block;
`;

interface Props {
  legend?: string;
}

export const Fieldset: React.FC<Props> = ({ legend, children }) => (
  <StyledFieldset>
    {legend ? <Legend>{legend}</Legend> : null}
    {children}
  </StyledFieldset>
);

export default Fieldset;
