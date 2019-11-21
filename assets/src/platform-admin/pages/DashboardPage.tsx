import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { TODO, PageTitle, Link } from "@pay/web";

const DashboardPage: React.FunctionComponent = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <>
      <PageTitle title="Platform admin" />
      <TODO>
        <ul>
          <li>
            <Link to={`${url}/organisations`}>Organisations</Link>
          </li>
          <li>
            <Link to={`${url}/services`}>Services</Link>
          </li>
          <li>
            <Link to={`${url}/card-types`}>Card types</Link>
          </li>
        </ul>
      </TODO>
    </>
  );
};

export default DashboardPage;
