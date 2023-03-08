# [4.1.0](https://github.com/decentralized-identity/did-resolver/compare/4.0.1...4.1.0) (2023-03-08)


### Features

* add type definitions for ConditionalProof2022 ([#143](https://github.com/decentralized-identity/did-resolver/issues/143)) ([c4f62d3](https://github.com/decentralized-identity/did-resolver/commit/c4f62d3ef5209bdec509f456601563e7eeb56c7a))

## [4.0.1](https://github.com/decentralized-identity/did-resolver/compare/4.0.0...4.0.1) (2022-10-17)


### Bug Fixes

* **build:** add types to exports ([#139](https://github.com/decentralized-identity/did-resolver/issues/139)) ([349e882](https://github.com/decentralized-identity/did-resolver/commit/349e882195b156c50e412b2258802aade3be3091)), closes [#138](https://github.com/decentralized-identity/did-resolver/issues/138) [#137](https://github.com/decentralized-identity/did-resolver/issues/137)

# [4.0.0](https://github.com/decentralized-identity/did-resolver/compare/3.2.2...4.0.0) (2022-08-02)


### Bug Fixes

* **types:** update Service interface to match latest DID spec ([#136](https://github.com/decentralized-identity/did-resolver/issues/136)) ([4ead68e](https://github.com/decentralized-identity/did-resolver/commit/4ead68e54dc2c41015ea5dda39b00fe2a2881190)), closes [#135](https://github.com/decentralized-identity/did-resolver/issues/135)


### BREAKING CHANGES

* **types:** the `ServiceEndpoint` type has been renamed to `Service` and a new type `ServiceEndpoint` was created to fit the [DID spec](https://www.w3.org/TR/did-core/#services)

## [3.2.2](https://github.com/decentralized-identity/did-resolver/compare/3.2.1...3.2.2) (2022-06-05)


### Bug Fixes

* **build:** fix typo in package exports ([832ea58](https://github.com/decentralized-identity/did-resolver/commit/832ea58091175452ded0d03067aa12c4e5d0820e))

## [3.2.1](https://github.com/decentralized-identity/did-resolver/compare/3.2.0...3.2.1) (2022-06-05)


### Bug Fixes

* **ci:** groom the build scripts and dependencies ([#133](https://github.com/decentralized-identity/did-resolver/issues/133)) ([5c71b08](https://github.com/decentralized-identity/did-resolver/commit/5c71b08f5df42a619db87c14139eee0f3ecc5fb4))

# [3.2.0](https://github.com/decentralized-identity/did-resolver/compare/3.1.5...3.2.0) (2022-03-29)


### Features

* export JsonWebKey Interface ([#126](https://github.com/decentralized-identity/did-resolver/issues/126)) ([519c8bd](https://github.com/decentralized-identity/did-resolver/commit/519c8bd4dcfbb06259c146c66003a8e3a98f4e9d)), closes [#125](https://github.com/decentralized-identity/did-resolver/issues/125)

## [3.1.5](https://github.com/decentralized-identity/did-resolver/compare/3.1.4...3.1.5) (2021-12-09)


### Bug Fixes

* use Resolvable as type instead of Resolver ([#110](https://github.com/decentralized-identity/did-resolver/issues/110)) ([35c4d67](https://github.com/decentralized-identity/did-resolver/commit/35c4d67e5750338983a89c125f424d7d039aaf68)), closes [#109](https://github.com/decentralized-identity/did-resolver/issues/109)

## [3.1.4](https://github.com/decentralized-identity/did-resolver/compare/3.1.3...3.1.4) (2021-12-04)


### Bug Fixes

* add optional `[@context](https://github.com/context)` to result data type ([#108](https://github.com/decentralized-identity/did-resolver/issues/108)) ([39a3301](https://github.com/decentralized-identity/did-resolver/commit/39a330197b2125b59456284e01732340149bab82))

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
