import { FC, PropsWithChildren } from "react";

export function withProvider(
  WrappedComponent: React.ComponentType,
  Provider: FC<PropsWithChildren>,
) {
  const Container = () => {
    return (
      <Provider>
        <WrappedComponent />
      </Provider>
    );
  };
  return Container;
}
