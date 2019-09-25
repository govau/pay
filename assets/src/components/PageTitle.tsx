import * as React from "react";
import { H1, H2, H3, H4 } from "@pay/web";

interface Props {
  title: string;
  /** the visual size of the heading. headings always rendered as h1 */
  headingSize?: "xl" | "h2" | "h3" | "h4";
  /** group the heading with the content beneath it */
  grouped?: boolean;
}

class PageTitle extends React.Component<Props> {
  headingElem: React.RefObject<HTMLHeadingElement>;

  constructor(props: Props) {
    super(props);
    this.headingElem = React.createRef();
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.headingElem.current && this.headingElem.current.focus();
    });
  }

  getHeadingComponent() {
    const { headingSize } = this.props;
    switch (headingSize) {
      case "h2":
        return H2;
      case "h3":
        return H3;
      case "h4":
        return H4;
      default:
        return H1;
    }
  }

  render() {
    const { title, grouped, headingSize } = this.props;
    const Heading = this.getHeadingComponent();
    return (
      <Heading
        ref={this.headingElem}
        tabIndex={-1}
        grouped={grouped}
        as="h1"
        style={{ outline: "none" }}
        xl={headingSize === "xl"}
      >
        {title}
      </Heading>
    );
  }
}

export default PageTitle;
