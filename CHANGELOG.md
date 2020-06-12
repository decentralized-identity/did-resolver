## [2.0.1](https://github.com/decentralized-identity/did-resolver/compare/2.0.0...2.0.1) (2020-06-12)


### Bug Fixes

* **ci:** fine-tune release to include yarn.lock when committing the version bump ([#46](https://github.com/decentralized-identity/did-resolver/issues/46)) ([07f2f1d](https://github.com/decentralized-identity/did-resolver/commit/07f2f1d62b097abf04518a2e70392bdeeb63da1f))

# [2.0.0](https://github.com/decentralized-identity/did-resolver/compare/1.1.0...2.0.0) (2020-06-10)


### Bug Fixes

* return non-nullable DIDDocument on `Resolver.resolve()` ([#21](https://github.com/decentralized-identity/did-resolver/issues/21)) ([2753e3e](https://github.com/decentralized-identity/did-resolver/commit/2753e3ec8383c88fb390733f7086fdf963e95917))


### BREAKING CHANGES

* The `Resolver.resolve()` method throws an error (rejects the promise) if the DID document returned by the respective method is `null`.
Also, `null` documents are not cached.

# [1.1.0](https://github.com/decentralized-identity/did-resolver/compare/v1.0.0...1.1.0) (2019-11-08)


### Bug Fixes

* typo in type declaration in resolver.ts ([0b20750](https://github.com/decentralized-identity/did-resolver/commit/0b207501c3f6fb7f0556268093e8d8db272ea2ee))


### Features

* basic caching support ([a495237](https://github.com/decentralized-identity/did-resolver/commit/a4952378dd1f2168d4022dcc50c2c55ad4adf65d))
