import * as React from "react";
import { H1 } from "@pay/web";
import { Breadcrumbs } from "./Breadcrumb";

interface Props {
  title: string;
  breadcrumbs?: React.ReactNode[];
}

class PageTitle extends React.Component<Props> {
  ref: React.RefObject<HTMLHeadingElement>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.ref.current && this.ref.current.focus();
    });
  }

  render() {
    const { title, breadcrumbs } = this.props;

    return (
      <>
        {breadcrumbs ? <Breadcrumbs>{breadcrumbs}</Breadcrumbs> : null}
        <H1 ref={this.ref} tabIndex={-1} as="h1" style={{ outline: "none" }}>
          {title}
        </H1>
      </>
    );
  }
}

export default PageTitle;
