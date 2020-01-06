import React from "react";
import { useLocation } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import slugify from "@sindresorhus/slugify";
import styled from "@pay/web/styled-components";
import {
  PageTitle as CorePageTitle,
  H2 as CoreH2,
  H3 as CoreH3,
  H4 as CoreH4,
  P,
  ExternalLink as CoreExternalLink,
  Strong,
  UL,
  Pre as CorePre,
  PreLineNumbers,
  Hr,
  DescriptionList,
  ErrorAlert,
  Loader
} from "@pay/web";
import * as CoreTable from "@pay/web/components/Table";

import images from "./images";

const idify = (s: undefined | string[]) =>
  s && s.length > 0 ? slugify(s[0].replace(/’/g, "")) : "";

const PageTitle: React.FC<{ children?: string }> = ({ children, ...props }) => (
  <CorePageTitle title={children || ""} {...props} />
);

const PermalinkLink = styled(CoreExternalLink)`
  margin-left: 0.5rem;
  color: inherit;
  opacity: 0;
  text-decoration: none;
`;

const PermalinkImage = styled.span`
  vertical-align: text-top;
`;

const Permalink: React.FC<{ id: string }> = ({ id }) => (
  <PermalinkLink href={`#${id}`}>
    <PermalinkImage role="img" aria-label="permalink">
      ¶
    </PermalinkImage>
  </PermalinkLink>
);

const Heading = styled.div`
  &:hover {
    ${PermalinkLink} {
      opacity: 1;
    }
  }
`;

const H2: React.FC<{ children?: string[] }> = ({ children, ...props }) => {
  const id = idify(children);
  return (
    <Heading>
      <CoreH2 {...props} id={id}>
        {children}
        <Permalink id={id} />
      </CoreH2>
    </Heading>
  );
};

const H3: React.FC<{ children?: string[] }> = ({ children, ...props }) => {
  const id = idify(children);
  return (
    <Heading>
      <CoreH3 {...props} id={id}>
        {children}
        <Permalink id={id} />
      </CoreH3>
    </Heading>
  );
};

const H4: React.FC<{ children?: string[] }> = ({ children, ...props }) => {
  const id = idify(children);
  return (
    <Heading>
      <CoreH4 {...props} id={id}>
        {children}
        <Permalink id={id} />
      </CoreH4>
    </Heading>
  );
};

const Pre: React.FC<{ children?: string }> = ({ children, ...props }) => {
  const lines = React.isValidElement(children)
    ? (children.props.children as string).split("\n")
    : [];

  return (
    <CorePre {...props}>
      {children}
      {lines.length > 0 && (
        <PreLineNumbers>
          {lines.map((_, i) => (
            <span key={i} />
          ))}
        </PreLineNumbers>
      )}
    </CorePre>
  );
};

const Table: React.FC = ({ children, ...props }) => (
  <CoreTable.ResponsiveWrapper {...props}>
    <CoreTable.Table>{children}</CoreTable.Table>
  </CoreTable.ResponsiveWrapper>
);

const ExternalLink: React.FC<{ href: string }> = ({ href, ...props }) => {
  if (href.startsWith("docs/images/")) {
    href = images[href.replace("docs/images/", "")];
  }
  return <CoreExternalLink href={href} {...props} />;
};

const Img = styled.img`
  width: 100%;
`;

const Image: React.FC<{
  src: string;
}> = ({ src, ...props }) => {
  if (src.startsWith("docs/images/")) {
    src = images[src.replace("docs/images/", "")];
  }
  return <Img src={src} {...props} />;
};

const options = {
  overrides: {
    h1: { component: PageTitle },
    h2: { component: H2 },
    h3: { component: H3 },
    h4: { component: H4 },
    p: { component: P },
    a: { component: ExternalLink },
    strong: { component: Strong },
    b: { component: Strong },
    ul: { component: UL },
    pre: { component: Pre },
    hr: { component: Hr },
    dl: { component: DescriptionList },
    table: { component: Table },
    tr: { component: CoreTable.Row },
    th: { component: CoreTable.Header },
    td: { component: CoreTable.Cell },
    img: { component: Image }
  }
};

const MarkdownPage: React.FC<{ path: string }> = ({ path }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState();
  const [markdown, setMarkdown] = React.useState("");

  const fetchData = React.useCallback(
    async function() {
      setLoading(true);
      try {
        const res = await fetch(path);
        const text = await res.text();
        if (!res.ok) {
          setError(new Error(text));
          return;
        }
        setMarkdown(text);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [path]
  );

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const location = useLocation();
  const didMountRef = React.useRef(false);
  const didScrollRef = React.useRef(false);

  // The reason for all the complexity in this effect is that we need to wait
  // until markdown-to-jsx has parsed the markdown content and rendered its
  // headings before we can scroll to the heading element. If there's a better
  // way we should do that instead.
  React.useEffect(() => {
    setTimeout(() => {
      // Simulate componentDidUpdate...
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }

      if (didScrollRef.current) {
        return;
      }

      // Find the heading that matches the URL fragment. If none exists, abort.
      const el = document.getElementById(location.hash.slice(1));
      if (!el) {
        return;
      }

      // Natively scroll the window to the right heading and abort the effect
      // from now on.
      window.location.href = location.hash;
      didScrollRef.current = true;
    }, 0);
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorAlert
          title="Unable to load the page"
          message={error && error.message}
          showError
        />
      ) : (
        <Markdown options={options}>{markdown}</Markdown>
      )}
    </>
  );
};

export default MarkdownPage;
