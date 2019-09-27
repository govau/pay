import * as React from "react";
import { PageTitle, Link } from "@pay/web";

const HomePage: React.FunctionComponent = () => (
  <>
    <PageTitle title="Home page" />
    <ul>
      <li>
        <Link to={`/auth/signin`}>Sign in</Link>
      </li>
    </ul>
  </>
);

export default HomePage;
