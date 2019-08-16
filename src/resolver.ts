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

export interface ParsedDID {
  did: string
  method: string
  id: string
  path?: string
  fragment?: string
}

export interface DIDResolver {
  (did: string, parsed: ParsedDID, didResolver: Resolver): Promise<null | DIDDocument>
}

interface ResolverRegistry {
  [index: string]: DIDResolver
}

export function parse(did: string): ParsedDID {
  if (did === '') throw new Error('Missing DID')
  const sections = did.match(/^did:([a-zA-Z0-9_]+):([:[a-zA-Z0-9_.-]+)(\/[^#]*)?(#.*)?$/)
  if (sections) {
    const parts: ParsedDID = { did: sections[0], method: sections[1], id: sections[2] }
    if (sections[3]) parts.path = sections[3]
    if (sections[4]) parts.fragment = sections[4].slice(1)
    return parts
  }
  throw new Error(`Invalid DID ${did}`)
}

export class Resolver {
  private registry: ResolverRegistry
  constructor(registry: ResolverRegistry = {}) {
    this.registry = registry
  }

  resolve(did: string): Promise<DIDDocument | null> {
    try {
      const parsed = parse(did)
      const resolver = this.registry[parsed.method]
      if (resolver) {
        return resolver(did, parsed, this)
      }
      return Promise.reject(new Error(`Unsupported DID method: '${parsed.method}'`));
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

