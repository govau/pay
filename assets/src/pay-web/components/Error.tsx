import * as React from "react";
import styled from "@pay/web/styled-components";
import { tablet } from "@pay/web";

export interface ErrorProps {
  title: string;
  message?: string;
}

const ErrorWrapper = styled.div`
  background: ${props => props.theme.colors.lightGrey};
  border-left: 4px solid ${props => props.theme.colors.red};
  margin: 2rem 0 2rem 0;
  display: flex;
  border-color: ${props => props.theme.colors.red};
  padding: 2rem 1.5rem;
  @media ${tablet} {
    padding: 2rem 2.5rem;
  }
`;

const IconWrapper = styled.div`
  margin-right: 1.5rem;
`;

const TextWrapper = styled.div`
  margin-top: 0.8rem;
`;

const Title = styled.strong`
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorIcon = () => (
  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="nonzero" fill="none">
      <path
        d="M39.932 19.967C39.932 8.939 30.993 0 19.966 0 8.94 0 0 8.94 0 19.967c0 11.026 8.94 19.965 19.966 19.965 11.027 0 19.966-8.94 19.966-19.965z"
        fill="#B10E1E"
      />
      <path
        d="M22.297 19.966l5.837-6.776a1.766 1.766 0 0 0-2.676-2.305l-5.492 6.375-5.491-6.375a1.766 1.766 0 1 0-2.677 2.305l5.837 6.776-5.837 6.776a1.766 1.766 0 1 0 2.677 2.306l5.491-6.375 5.492 6.375c.349.406.842.613 1.339.613a1.766 1.766 0 0 0 1.338-2.919l-5.838-6.776z"
        fill="#FFF"
      />
    </g>
  </svg>
);

const Error: React.FC<ErrorProps> = ({ title, message }) => (
  <ErrorWrapper>
    <IconWrapper>
      <ErrorIcon />
    </IconWrapper>
    <TextWrapper>
      <Title>{title}</Title>
      {message && <div>{message}</div>}
    </TextWrapper>
  </ErrorWrapper>
);

export default Error;
