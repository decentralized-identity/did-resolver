
const REGISTRY = {}

export function registerMethod (method, resolver) {
  REGISTRY[method] = resolver
}

export function parse (did) {
  if (!did || did === '') throw new Error('Missing DID')
  const sections = did.match(/^did:([a-zA-Z0-9]+):([[a-zA-Z0-9.-]+)(\/[^#]*)?(#.*)?$/)
  if (sections) {
    const parts = {did: sections[0], method: sections[1], id: sections[2]}
    if (sections[3]) parts.path = sections[3]
    if (sections[4]) parts.fragment = sections[4].slice(1)
    return parts
  }
  throw new Error(`Invalid DID ${did}`)
}

export function resolve (did) {
  return new Promise((resolve, reject) => {
    const parsed = parse(did)
    const resolver = REGISTRY[parsed.method]
    if (resolver) {
      return resolver(did, parsed).then(resolve, reject)
    }
    reject(new Error(`Unsupported DID method: '${parsed.method}'`))
  })
}

export default resolve
resolve.registerMethod = registerMethod
resolve.parse = parse
module.exports = resolve
