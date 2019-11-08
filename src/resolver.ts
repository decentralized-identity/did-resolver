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

export interface DIDDocument {
  '@context': 'https://w3id.org/did/v1'
  id: string
  publicKey: PublicKey[]
  authentication?: Authentication[]
  uportProfile?: any
  service?: ServiceEndpoint[]
}

export interface ServiceEndpoint {
  id: string
  type: string
  serviceEndpoint: string
  description?: string
}

export interface PublicKey {
  id: string
  type: string
  owner: string
  ethereumAddress?: string
  publicKeyBase64?: string
  publicKeyBase58?: string
  publicKeyHex?: string
  publicKeyPem?: string
}

export interface Authentication {
  type: string
  publicKey: string
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
  resolver: Resolver
) => Promise<null | DIDDocument>
export type WrappedResolver = () => Promise<null | DIDDocument>
export type DIDCache = (
  parsed: ParsedDID,
  resolve: WrappedResolver
) => Promise<null | DIDDocument>

interface ResolverRegistry {
  [index: string]: DIDResolver
}

export function inMemoryCache(): DIDCache {
  const cache: Map<string, DIDDocument | null> = new Map()
  return async (parsed, resolve) => {
    if (parsed.params && parsed.params['no-cache'] === 'true')
      return await resolve()

    const cached = cache.get(parsed.did)
    if (cached !== undefined) return cached
    const doc = await resolve()
    cache.set(parsed.did, doc)
    return doc
  }
}

export function noCache(
  parsed: ParsedDID,
  resolve: WrappedResolver
): Promise<null | DIDDocument> {
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
export function parse(didUrl: string): ParsedDID {
  if (didUrl === '' || !didUrl) throw new Error('Missing DID')
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
  throw new Error(`Invalid DID ${didUrl}`)
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

  resolve(didUrl: string): Promise<DIDDocument | null> {
    try {
      const parsed = parse(didUrl)
      const resolver = this.registry[parsed.method]
      if (resolver) {
        return this.cache(parsed, () => resolver(parsed.did, parsed, this))
      }
      return Promise.reject(
        new Error(`Unsupported DID method: '${parsed.method}'`)
      )
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
