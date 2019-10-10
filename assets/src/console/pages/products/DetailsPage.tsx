import * as React from "react";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  Form,
  Field,
  BasicTextInput,
  Button,
  validators,
  tablet
} from "@pay/web";
import styled from "@pay/web/styled-components";

const InputWrapper = styled.div`
  ${BasicTextInput} {
    @media ${tablet} {
      min-width: 50rem;
    }
  }
`;

const DetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Set payment link information</title>
      </Helmet>
      <PageTitle title="Set payment link information" />
      <Form onSubmit={() => {}}>
        <Field
          name="name"
          label="Title"
          description="Briefly describe what the user is paying for. For example, “Pay for a parking permit”. This will also be your website address."
          validate={validators.required("Enter a payment link title")}
        >
          {({ input, ariaProps, ...rest }) => (
            <InputWrapper>
              <BasicTextInput {...input} {...ariaProps} {...rest} />
            </InputWrapper>
          )}
        </Field>
        <Field
          name="description"
          label="Details"
          description="Give your users more information. For example, you could tell them how long it takes for their application to be processed."
        >
          {({ input, ariaProps, ...rest }) => (
            <InputWrapper>
              <BasicTextInput {...input} {...ariaProps} {...rest} />
            </InputWrapper>
          )}
        </Field>
        <Button type="submit">Continue</Button>
      </Form>
    </>
  );
};

export default DetailsPage;
