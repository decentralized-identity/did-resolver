// Copyright 2018 ConsenSys AG

// Licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export interface DIDResolutionResult {
  didResolutionMetadata: DIDResolutionMetadata
  didDocument: DIDDocument | null
  didDocumentMetadata: DIDDocumentMetadata
}

export interface DIDResolutionOptions {
  accept?: string
}

export interface DIDResolutionMetadata {
  contentType?: string
  error?: 'invalidDid' | 'notFound' | 'representationNotSupported'
}

export interface DIDDocumentMetadata {
  created?: string
  updated?: string
  deactivated?: boolean
  versionId?: string
  nextUpdate?: string
  nextVersionId?: string
  equivalentId?: string
  canonicalId?: string
}

export interface DIDDocument {
  '@context'?: 'https://w3id.org/did/v1' | string | string[]
  id: string
  alsoKnownAs?: string[]
  controller?: string | string[]
  verificationMethod?: VerificationMethod[]
  authentication?: (string | VerificationMethod)[]
  assertionMethod?: (string | VerificationMethod)[]
  keyAgreement?: (string | VerificationMethod)[]
  capabilityInvocation?: (string | VerificationMethod)[]
  capabilityDelegation?: (string | VerificationMethod)[]
  service?: ServiceEndpoint[]
}

export interface ServiceEndpoint {
  id: string
  type: string
  serviceEndpoint: string
  description?: string
}

interface JsonWebKey {
  alg?: string
  crv?: string
  e?: string
  ext?: boolean
  key_ops?: string[]
  kid?: string
  kty: string
  n?: string
  use?: string
  x?: string
  y?: string
  [x: string]: any
}

export interface VerificationMethod {
  id: string
  type: string
  controller: string
  publicKeyBase58?: string
  publicKeyJwk?: JsonWebKey
  publicKeyHex?: string
  blockchainAccountId?: string
  ethereumAddress?: string
}

export interface Params {
  [index: string]: string
}

export interface ParsedDID {
  did: string
  didUrl: string
  method: string
  id: string
  path?: string
  fragment?: string
  query?: string
  params?: Params
}

export type DIDResolver = (
  did: string,
  parsed: ParsedDID,
  resolver: Resolver,
  options: DIDResolutionOptions
) => Promise<DIDResolutionResult>
export type WrappedResolver = () => Promise<DIDResolutionResult>
export type DIDCache = (
  parsed: ParsedDID,
  resolve: WrappedResolver
) => Promise<DIDResolutionResult>

interface ResolverRegistry {
  [index: string]: DIDResolver
}

export function inMemoryCache(): DIDCache {
  const cache: Map<string, DIDResolutionResult> = new Map()
  return async (parsed, resolve) => {
    if (parsed.params && parsed.params['no-cache'] === 'true')
      return await resolve()

    const cached = cache.get(parsed.didUrl)
    if (cached !== undefined) return cached
    const doc = await resolve()
    if (doc !== null) {
      cache.set(parsed.didUrl, doc)
    }
    return doc
  }
}

export function noCache(
  parsed: ParsedDID,
  resolve: WrappedResolver
): Promise<DIDResolutionResult> {
  return resolve()
}

const ID_CHAR = '[a-zA-Z0-9_.-]'
const METHOD = '([a-zA-Z0-9_]+)'
const METHOD_ID = `(${ID_CHAR}+(:${ID_CHAR}+)*)`
const PARAM_CHAR = '[a-zA-Z0-9_.:%-]'
const PARAM = `;${PARAM_CHAR}+=${PARAM_CHAR}*`
const PARAMS = `((${PARAM})*)`
const PATH = `(\/[^#?]*)?`
const QUERY = `([?][^#]*)?`
const FRAGMENT = `(\#.*)?`
const DID_MATCHER = new RegExp(
  `^did:${METHOD}:${METHOD_ID}${PARAMS}${PATH}${QUERY}${FRAGMENT}$`
)
export function parse(didUrl: string): ParsedDID | null {
  if (didUrl === '' || !didUrl) return null
  const sections = didUrl.match(DID_MATCHER)
  if (sections) {
    const parts: ParsedDID = {
      did: `did:${sections[1]}:${sections[2]}`,
      method: sections[1],
      id: sections[2],
      didUrl
    }
    if (sections[4]) {
      const params = sections[4].slice(1).split(';')
      parts.params = {}
      for (const p of params) {
        const kv = p.split('=')
        parts.params[kv[0]] = kv[1]
      }
    }
    if (sections[6]) parts.path = sections[6]
    if (sections[7]) parts.query = sections[7].slice(1)
    if (sections[8]) parts.fragment = sections[8].slice(1)
    return parts
  }
  return null
}

export class Resolver {
  private registry: ResolverRegistry
  private cache: DIDCache

  constructor(
    registry: ResolverRegistry = {},
    cache?: DIDCache | boolean | undefined
  ) {
    this.registry = registry
    this.cache = cache === true ? inMemoryCache() : cache || noCache
  }

  async resolve(
    didUrl: string,
    options: DIDResolutionOptions = {}
  ): Promise<DIDResolutionResult> {
    const parsed = parse(didUrl)
    if (parsed === null) {
      return {
        didResolutionMetadata: { error: 'invalidDid' },
        didDocument: null,
        didDocumentMetadata: {}
      }
    }
    const resolver = this.registry[parsed.method]
    if (!resolver) {
      throw new Error(`Unsupported DID method: '${parsed.method}'`)
    }
    return this.cache(parsed, () => resolver(parsed.did, parsed, this, options))
  }
}
