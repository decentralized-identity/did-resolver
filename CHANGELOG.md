## [3.1.3](https://github.com/decentralized-identity/did-resolver/compare/3.1.2...3.1.3) (2021-10-26)


### Bug Fixes

* update regex to match DID specification ([#105](https://github.com/decentralized-identity/did-resolver/issues/105)) ([4f71bc5](https://github.com/decentralized-identity/did-resolver/commit/4f71bc5fa3806d97bfd6f0494b4aaa88d0ef39db)), closes [#104](https://github.com/decentralized-identity/did-resolver/issues/104)

## [3.1.2](https://github.com/decentralized-identity/did-resolver/compare/3.1.1...3.1.2) (2021-09-29)


### Bug Fixes

* editorial fix to trigger a new release ([52098b4](https://github.com/decentralized-identity/did-resolver/commit/52098b4f1b11fd2b0b17e2314eef7438fc321785))

## [3.1.1](https://github.com/decentralized-identity/did-resolver/compare/3.1.0...3.1.1) (2021-09-27)


### Bug Fixes

* **docs:** editorial fix, include recent changes ([db504fd](https://github.com/decentralized-identity/did-resolver/commit/db504fd4b1ae849846f30cb6217282f602c85875))

# [3.1.0](https://github.com/decentralized-identity/did-resolver/compare/3.0.2...3.1.0) (2021-03-26)


### Features

* export the Resolvable type definition ([ddc0ec2](https://github.com/decentralized-identity/did-resolver/commit/ddc0ec2d59e93769e0d523ced2e1c05f43712110))

## [3.0.2](https://github.com/decentralized-identity/did-resolver/compare/3.0.1...3.0.2) (2021-03-12)


### Bug Fixes

* allow the use of % char in method specific ID ([#86](https://github.com/decentralized-identity/did-resolver/issues/86)) ([3a21466](https://github.com/decentralized-identity/did-resolver/commit/3a21466a05107ed53cf0a9a10106fedc63e41727))

## [3.0.1](https://github.com/decentralized-identity/did-resolver/compare/3.0.0...3.0.1) (2021-03-02)


### Bug Fixes

* export interfaces needed by resolvers ([#83](https://github.com/decentralized-identity/did-resolver/issues/83)) ([89e8c9c](https://github.com/decentralized-identity/did-resolver/commit/89e8c9cb76c27da587730b6aca2665f2a5a3b0b3))

# [3.0.0](https://github.com/decentralized-identity/did-resolver/compare/2.2.0...3.0.0) (2021-03-02)


### Features

* update resolve method signature to match did core spec ([#82](https://github.com/decentralized-identity/did-resolver/issues/82)) ([313e685](https://github.com/decentralized-identity/did-resolver/commit/313e6858b2819dd9c95b443995b39ed8fed1d678)), closes [#79](https://github.com/decentralized-identity/did-resolver/issues/79)


### BREAKING CHANGES

* the `Resolver` and `DIDResolver` data types have been upgraded.
To use a legacy resolver that simply returns a `DIDDocument`, please register it under the `options.legacyResolvers` constructor param

# [2.2.0](https://github.com/decentralized-identity/did-resolver/compare/2.1.2...2.2.0) (2021-02-26)


### Features

* add type definition for JWK formatted public keys ([#80](https://github.com/decentralized-identity/did-resolver/issues/80)) ([f9b9c8d](https://github.com/decentralized-identity/did-resolver/commit/f9b9c8dda1066ee82055bb3b98f57b847b979463))

## [2.1.2](https://github.com/decentralized-identity/did-resolver/compare/2.1.1...2.1.2) (2020-12-09)


### Bug Fixes

* **types:** fix data type for "authentication" array in `DIDDocument` ([#60](https://github.com/decentralized-identity/did-resolver/issues/60)) ([d017cb3](https://github.com/decentralized-identity/did-resolver/commit/d017cb32cc24ec84994d1b7c4fb56126a796dfff))
* extend `DIDDocument.[@context](https://github.com/context)` data type to include arrays ([#70](https://github.com/decentralized-identity/did-resolver/issues/70)) ([8781b69](https://github.com/decentralized-identity/did-resolver/commit/8781b691ebeacd24a185b96ae33d8426309df9a4)), closes [#68](https://github.com/decentralized-identity/did-resolver/issues/68)

## [2.1.1](https://github.com/decentralized-identity/did-resolver/compare/2.1.0...2.1.1) (2020-08-19)


### Bug Fixes

* **spec:** add keyAgreement property ([#56](https://github.com/decentralized-identity/did-resolver/issues/56)) ([1631fa9](https://github.com/decentralized-identity/did-resolver/commit/1631fa91cac0888c039c84a543855193081273e3))

# [2.1.0](https://github.com/decentralized-identity/did-resolver/compare/2.0.1...2.1.0) (2020-08-14)


### Features

* rename PublicKey attribute 'owner' to 'controller' ([#55](https://github.com/decentralized-identity/did-resolver/issues/55)) ([850e5a5](https://github.com/decentralized-identity/did-resolver/commit/850e5a5ce8eb3f2a018bc489c5c3228f14a88a23)), closes [#54](https://github.com/decentralized-identity/did-resolver/issues/54)

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
