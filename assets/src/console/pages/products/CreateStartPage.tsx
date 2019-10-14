import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, LinkButton } from "@pay/web";
import { useRouteMatch } from "react-router";

const CreateStartPage = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <>
      <Helmet>
        <title>Create payment link</title>
      </Helmet>
      <PageTitle title="Create payment link" />
      <P>
        You can create a payment link so that users can make online payments to
        your service. Even if you don’t have a digital service, GOV.UK Pay can
        still take payments for you.
      </P>
      <P>
        It’s quick and easy to create a payment link and you don’t need any
        technical knowledge.
      </P>
      <P>The same payment link can be used by all users of your service.</P>
      <LinkButton to={`${url}/details`}>Create a payment link</LinkButton>
    </>
  );
};

export default CreateStartPage;
