import { BaseThemedCssFunction } from "styled-components";

export default interface Theme {
  textColor: string;
  criticalColor: string;
  bodyBgColor: string;
  bgColor: string;
  fontFamily: string;
  monospaceFontFamily?: string;
  fontWeight: string | number;
  link: {
    color: string;
    hoverColor: string;
    textDecorationColor: string;
  };
  heading: {
    fontFamily: string;
  };
  logo: {
    color: string;
    hoverColor: string;
    fontFamily: string;
    fontWeight: number;
  };
  header: {
    bgColor: string;
    boxShadow: string;
  };
  main: {
    bgColor: string;
  };
  footer: {
    color: string;
    bgColor: string;
    hrColor: string;
    link: {
      color: string;
      hoverColor: string;
      textDecorationColor: string;
    };
    logo?: {
      color: string;
      hoverColor: string;
    };
    copyrightColor: string;
  };
  alert: {
    warning: {
      bgColor: string;
      borderColor: string;
    };
  };
  formControl: {
    borderColor: string;
  };
  button: {
    primary: {
      color: string;
      bgColor: string;
    };
    secondary: {
      color: string;
      bgColor: string;
      hoverBgColor: string;
    };
  };
  form: {
    fieldError: {
      color: string;
    };
  };
  code?: {
    textColor: string;
    bgColor: string;
    scrollbarThumb: string;
    borderColor: string;
    lineHighlightBorderColor: string;
  };
}
