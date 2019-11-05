# Javascript DID Resolver

This library is intended as a simple common interface for javascript applications to resolve DID documents from Decentralized Identifiers (DIDs).

This is intended to support the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

The library does not implement any specific DID method, but allows DID method implementors to release npm packages that applications can add.

## Breaking changes (0.1.0)

This removes the global resolver. We've learnt that this ended up causing many problems. Instead you should now instantiate a Resolver object and use that to resolve did's within your consuming app/library.

### Changes required for developers of DID resolvers

You now no longer register your DID resolvers using the global `registerMethod()` function. Instead export the resolver function and show how to configure it in a local resolver object.

## Configure `Resolver` object

You are now required to preconfigure a resolver during instantiation:

```js
import { Resolver } from 'did-resolver'
import ethr from 'ethr-did-resolver'
import web from 'web-did-resolver'
import sov from 'sov-did-resolver'

const resolver = new Resolver({
  ethr,
  web,
  https: web // Override a did method type
})
```

## Resolving a DID document

The resolver presents a simple `resolve()` function that returns a ES6 Promise returning the DID document.

```js
resolver.resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await resolver.resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123')
```

## Caching

Resolving DID Documents can be expensive. It is in most cases best to cache DID documents. Caching has to be specifically enabled using the `cache` parameter

The built in cache uses a Map, but does not have an automatic TTL, so entries don't expire. This is fine in most web, mobile and serverless contexts. If you run a long running process you may want to use an existing configurable caching system.

The built in Cache can be enabled by passing in a `true` value to the constructor:

```js
const resolver = new DIDResolver({
  ethr,
  web
}, true)
```

Here is an example using `js-cache` which has not been tested.


```js
var cache = require('js-cache')
const customCache : DIDCache = (parsed, resolve) => {
  // DID spec requires to not cache if no-cache param is set
  if (parsed.params && parsed.params['no-cache'] === 'true') return await resolve()
  const cached = cache.get(parsed.didUrl)
  if (cached !== undefined) return cached
  const doc = await resolve()
  cache.set(parsed, doc, 60000)
  return doc
}

const resolver = new DIDResolver({
  ethr,
  web
}, customCache)
```

## Implementing a DID method

Each DID method will have it's own methods for looking up an identifier on it's respective blockchain or other decentralized storage mechanism.

A method implementer calls the `registerMethod('methodname', resolver)`. where `methodname` is the method identifier. The resolver is a function that receives a DID and a parsed version of the DID. It returns a ES6 Promise that looks up the DID document.

```js
export default async function myResolver (did, parsed, didResolver) {
  console.log(parsed)
  // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
  const didDoc = ...// lookup doc
  // If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
  const parentDID = await didResolver.resolve(...)
  //
  return didDoc
})
```

The method resolver should register this so that just requiring it will register the method:

```js
import { DIDResolver } from 'did-resolver'
import MyMethod from 'mymethod-did-resolver'

const resolver = new DIDResolver({
  mymethod: MyMethod
})
```

