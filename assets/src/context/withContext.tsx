import * as React from "react";

/**
 * A HOC to simplify the consumption of Context by passing
 * all context values to the Wrapped as props
 * @param Wrapped           Component that wants to consume the context
 * @param ContextConsumer   React.Context.Consumer component of any type
 * @returns React component
 */

function withContext<WrappedPropsT>(
  Wrapped: React.ComponentType<any>,
  ContextConsumer: React.ExoticComponent<React.ConsumerProps<any>>
): React.FC<WrappedPropsT> {
  const WithContext: React.FC<WrappedPropsT> = props => (
    <ContextConsumer>
      {values => <Wrapped {...values} {...props} />}
    </ContextConsumer>
  );

  WithContext.displayName = `withContext(${getDisplayName<WrappedPropsT>(
    Wrapped
  )})`;

  return WithContext;
}

function getDisplayName<WrappedPropsT>(
  Wrapped: React.ComponentType<WrappedPropsT>
): string {
  return Wrapped.displayName || Wrapped.name || "Component";
}

export default withContext;
