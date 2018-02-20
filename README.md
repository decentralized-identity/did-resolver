# Javascript DID Resolver

This library is intended as a simple common interface for javascript applications to resolve DID documents from Decentralized Identifiers (DIDs).

This is intended to support the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

The library does not implement any specific DID method, but allows DID method implementors to release npm packages that applications can add.

## Resolving a DID document

The resolver presents a simple `resolver()` function that returns a ES6 Promise returning the DID document.

```js
import resolve from 'did-resolver'

resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123')
```

## Implementing a DID method

Each DID method will have it's own methods for looking up an identifier on it's respective blockchain or other decentralized storage mechanism.

A method implementer calls the `registerMethod('methodname', resolver)`. where `methodname` is the method identifier. The resolver is a function that receives a DID and a parsed version of the DID. It returns a ES6 Promise that looks up the DID document.

```js
import { registerMethod } from 'did-resolver'
registerMethod('mymethod', (did, parsed) => new Promise(resolve, reject) => {
  console.log(parsed)
  // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
  const didDoc = ...// lookup doc
  resolve(didDoc)
})
```

The method resolver should register this so that just requiring it will register the method:

```js
import resolve from 'did-resolver'
import MyMethod from 'mymethod-did-resolver'

resolve('did:mymethod:abcdefg/some/path#fragment=123').then(doc => console.log)
```

