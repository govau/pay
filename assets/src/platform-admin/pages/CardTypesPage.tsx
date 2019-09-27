import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { CardTypesComponent } from "../__generated__/graphql";

interface State {}

class CardTypesPage extends React.Component<{}, State> {
  render() {
    return (
      <>
        <Helmet>
          <title>Card types</title>
        </Helmet>
        <PageTitle title="Card types" />
        <CardTypesComponent>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loader message="Loading card types." />;
            }
            if (error || !data) {
              return (
                <ErrorAlert
                  title="Unable to retrieve card types"
                  message={error && error.message}
                  showError
                />
              );
            }
            return (
              <ul>
                {data.cardTypes.map(ct => (
                  <li key={ct.id}>
                    {ct.type}: {ct.label} (slug: {ct.brand})
                  </li>
                ))}
              </ul>
            );
          }}
        </CardTypesComponent>
      </>
    );
  }
}

export default CardTypesPage;
