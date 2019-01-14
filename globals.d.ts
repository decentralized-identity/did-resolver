interface Window {
  DID_REGISTRY: any
}

declare module NodeJS {
  interface Global {
    DID_REGISTRY: any
  }
}
declare const global: NodeJS.Global