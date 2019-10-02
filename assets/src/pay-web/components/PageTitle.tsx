import * as React from "react";
import { H1 } from "@pay/web";

interface Props {
  title: string;
}

const useFocusedRef = () => {
  const ref = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      ref.current && ref.current.focus();
    });
  });

  return ref;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  const focus = useFocusedRef();

  return (
    <H1 tabIndex={-1} ref={focus}>
      {title}
    </H1>
  );
};

export default PageTitle;
