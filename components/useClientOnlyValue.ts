export function useClientOnlyValue<S, C>(server: S, cliente: C): S | C {
  return cliente;
}
