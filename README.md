# Javascript DID Resolver

This library is intended as a simple common interface for javascript applications to resolve DID documents from Decentralized Identifiers (DIDs).

This is intended to support the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

The library does not implement any specific DID method, but allows DID method implementors to release npm packages that applications can add.

## Breaking changes (0.1.0)

This removes the global resolver. We've learnt that this ended up causing many problems. Instead you should now instantiate a Resolver object and use that to resolve did's within your consuming app/library.

### Changes required for developers of DID resolvers

You now no longer register your DID resolvers using the global `registerMethod()` function. Instead export the resolver function and show how to configure it in a local resolver object.

## Configure `Resolver` object

You are now required to preconfigure a resolver during instantiation. The `Resolver` constructor expects a registry of methods mapped to a resolver function. For example: 
```
{ 
  ethr: resolve,
  web: resolve
}
```

Each method resolver should expose a function called `getResolver` which will return an object containing one of these key/value pairs. Then you can flatten them into one object to pass into the `Resolver` constructor. 
```js
import { Resolver } from 'did-resolver'
import ethr from 'ethr-did-resolver'
import web from 'web-did-resolver'
import sov from 'sov-did-resolver'

//returns an object of { methodName: resolveFunction}
ethrResolver = ethr.getResolver()
webResolver = web.getResolver()

//If you are using multiple methods you need to flatten them into one object
const resolver = new Resolver({
  ...ethrResolver,
  ...webResolver,
})

//If you are using one method you can simply pass the result of getResolver( into the constructor
const resolver = new Resolver(ethrResolver)
```

## Resolving a DID document

The resolver presents a simple `resolve()` function that returns a ES6 Promise returning the DID document.

```js
resolver.resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await resolver.resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123')
```

## Implementing a DID method

Each DID method will have it's own methods for looking up an identifier on it's respective blockchain or other decentralized storage mechanism.

A method implementer should export a `getResolver()` function. Which returns an object mapping the method name to a `resolve(did: string, parsed: ParsedDID)` function. e.g. `{ ethr: resolve }`. 

the resolve function should accept a did string, and an object of type [ParsedDID](https://github.com/decentralized-identity/did-resolver/blob/develop/src/resolver.ts#L51)

```js
export function getResolver() {
  async function resolve(
    did: string,
    parsed: ParsedDID
  ): Promise<DIDDocument | null> {
    console.log(parsed)
    // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
    const didDoc = ...// lookup doc
    // If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
    const parentDID = await didResolver.resolve(...)
    //
    return didDoc
  }

  return { myMethod: resolve }
}
```

The MyMethod `getResolver()` result could then be passed into the DIDResolver constructor. Note that it should be flattened if used with other methods as well. 

```js
import { DIDResolver } from 'did-resolver'
import MyMethod from 'mymethod-did-resolver'

const myResolver = MyMethod.getResolver()
const resolver = new DIDResolver(myResolver)
```

