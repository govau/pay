import { CSSObject, SimpleInterpolation } from "styled-components";
import { css } from "./styled-components";

const min = (size: string) => `(min-width: ${size})`;
const max = (size: string) => `(max-width: ${size})`;

// The types for first and interpolations are taken from the first field of
// BaseThemedCssFunction. It is possible that we need to support the other
// parameterized argument types, but for now this works.
const breakpoint = (size: string) => (
  first: TemplateStringsArray | CSSObject,
  ...interpolations: SimpleInterpolation[]
) => css`
  @media ${size} {
    ${css(first, ...interpolations)};
  }
`;

const mobile = max("40em");
const tablet = min("52em");
const desktop = min("64em");
const nondesktop = max("64em");

export { mobile, tablet, desktop, nondesktop };

export default {
  mobile: breakpoint(mobile),
  tablet: breakpoint(tablet),
  desktop: breakpoint(desktop),
  nondesktop: breakpoint(nondesktop)
};
