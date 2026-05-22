import React from 'react';
export function useClientOnlyValue<S, C>(server: S, cliente: C): S | C {
  const [value, setValue] = React.useState<S | C>(server);
  React.useEffect(() => {
    setValue(cliente);
  }, [cliente]);

  return value;
}
