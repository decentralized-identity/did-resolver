interface DIDDocument {
  '@context': 'https://w3id.org/did/v1'
  id: string
  publicKey?: PublicKey[]
  authentication?: Authentication[]
}

interface PublicKey {
  id: string
  type: string
  owner: string
  ethereumAddress?: string
  publicKeyBase64?: string
}

interface Authentication {
  type: string
  publicKey: string
}

interface ParsedDID {
  did: string
  method: string
  id: string
  path?: string
  fragment?: string
}

interface DIDResolver {
  (did: string, parsed: ParsedDID) : Promise<null|DIDDocument>
}

interface ResolverRegistry {
  [index: string]: DIDResolver
}

const REGISTRY : ResolverRegistry = {}

export function registerMethod (method: string, resolver: DIDResolver) {
  REGISTRY[method] = resolver
}

export function parse (did: string) : ParsedDID {
  if (!did || did === '') throw new Error('Missing DID')
  const sections = did.match(/^did:([a-zA-Z0-9_]+):([[a-zA-Z0-9_.-]+)(\/[^#]*)?(#.*)?$/)
  if (sections) {
    const parts : ParsedDID = {did: sections[0], method: sections[1], id: sections[2]}
    if (sections[3]) parts.path = sections[3]
    if (sections[4]) parts.fragment = sections[4].slice(1)
    return parts
  }
  throw new Error(`Invalid DID ${did}`)
}

export default async function resolve (did: string) : Promise<DIDDocument | null> {
  const parsed = parse(did)
  const resolver = REGISTRY[parsed.method]
  if (resolver) {
    return await resolver(did, parsed)
  }
  throw new Error(`Unsupported DID method: '${parsed.method}'`)
}