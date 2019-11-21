import * as React from "react";
import { TODO, PageTitle, Link } from "@pay/web";

const HomePage: React.FunctionComponent = () => (
  <>
    <PageTitle title="Home page" />
    <TODO>
      <ul>
        <li>
          <Link to={`/auth/signin`}>Sign in</Link>
        </li>
      </ul>
    </TODO>
  </>
);

export default HomePage;
