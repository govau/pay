import React from "react";
import { styledComponents } from "@pay/web";
import coa from "./coa_white.svg";
import coa_long from "./coa_white_long.svg";

const Logo = styledComponents.styled.img`
    display: initial;
    border-right: 1px solid #a9a9a9;
    height: 8rem;
    padding: 0.25rem 2.5rem 0.25rem 0;
    margin-left: -0.5rem;
    margin-right: 2.5rem;
`;

const StretchedLogo = styledComponents.styled.img`
    display: initial;
    height: 4rem;
`;

const Coat: React.FC<{ stretched: boolean }> = ({ stretched }) =>
  stretched ? <StretchedLogo src={coa_long} /> : <Logo src={coa} />;

export { Coat as default };
