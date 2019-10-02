import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { useCardTypesQuery } from "../__generated__/graphql";

const CardTypesPage: React.FC = () => {
  const { loading, error, data } = useCardTypesQuery({ errorPolicy: "all" });

  return (
    <>
      <Helmet>
        <title>Card types</title>
      </Helmet>
      <PageTitle title="Card types" />
      {loading ? (
        <Loader message="Loading card types" />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve card types"
          message={error && error.message}
          showError
        />
      ) : (
        <ul>
          {data.cardTypes.map(ct => (
            <li key={ct.id}>
              {ct.type}: {ct.label} (slug: {ct.brand})
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CardTypesPage;
