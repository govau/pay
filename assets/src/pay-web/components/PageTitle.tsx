import * as React from "react";
import { H1 } from "@pay/web";

interface Props {
  title: string;
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
    const { title } = this.props;
    return (
      <H1 ref={this.ref} tabIndex={-1} as="h1" style={{ outline: "none" }}>
        {title}
      </H1>
    );
  }
}

export default PageTitle;
