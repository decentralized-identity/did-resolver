/// <reference lib="dom" />

import {
  DIDDocument,
  DIDDocumentMetadata,
  DIDResolutionOptions,
  DIDResolutionResult,
  ParsedDID,
  Resolvable,
  ResolverRegistry,
} from './resolver'

export interface OanMetadata {
  subjectType?: string
  resourceType?: string
  nodeRole?: string
  identityType?: string
  controllerDid?: string
  publisherDid?: string
  issuerDid?: string
  ttl?: number
  resourceDescription?: Record<string, unknown>
  agentDescription?: Record<string, unknown>
  capabilityTags?: string[]
  protocolBindings?: Array<Record<string, unknown>>
  implementationLinks?: Array<Record<string, unknown>>
  addressBindings?: Array<Record<string, unknown>>
  delegationChain?: Array<Record<string, unknown>>
  credentialRequirements?: Array<Record<string, unknown>>
  packageInfo?: Record<string, unknown>
  modelFingerprints?: Array<Record<string, unknown>>
  servicePolicy?: string
  networkScope?: string
  lifecycleState?: string
  [x: string]: unknown
}

export interface OanDocument extends DIDDocument {
  oanMetadata?: OanMetadata
}

export interface OanResolverOptions {
  documents?: Record<string, OanDocument>
  defaultOanMetadata?: OanMetadata
}

const OAN_METHOD = 'oan'
const OAN_CONTEXT = ['https://www.w3.org/ns/did/v1', 'https://w3id.org/oan/v1']
const OAN_DID_ID_RE = /^[A-Z0-9]{4}:[1-9A-HJ-NP-Za-km-z]{32}$/
const OAN_SUBJECT_TYPE_BY_CODE: Record<string, string> = {
  AG: 'agent_service',
  SK: 'skill',
  MC: 'mcp_server',
  TL: 'tool_api',
  IN: 'infrastructure_node',
  OR: 'organization',
  DV: 'developer',
}

function getSemanticCode(id: string): string | null {
  const segments = id.split(':')
  if (segments.length !== 2) return null
  return segments[0]
}

function getDefaultOanMetadataFromId(id: string): OanMetadata {
  const semanticCode = getSemanticCode(id)
  if (!semanticCode) return {}

  const subjectCode = semanticCode.slice(0, 2)
  const inferredType = OAN_SUBJECT_TYPE_BY_CODE[subjectCode]
  if (!inferredType) return {}

  return {
    subjectType: inferredType,
    resourceType: inferredType,
  }
}

function normalizeOanId(id: string): string {
  const segments = id.split(':')
  if (segments.length !== 2) return id
  return `${segments[0].toUpperCase()}:${segments[1]}`
}

function parseOanQueryMetadata(parsed: ParsedDID): OanMetadata {
  const metadata: OanMetadata = {}
  if (!parsed.query) return metadata

  const params = new URLSearchParams(parsed.query)
  const stringFields = [
    'subjectType',
    'resourceType',
    'nodeRole',
    'identityType',
    'controllerDid',
    'publisherDid',
    'issuerDid',
    'servicePolicy',
    'networkScope',
    'lifecycleState',
  ]

  for (const field of stringFields) {
    const value = params.get(field)
    if (value !== null) metadata[field] = value
  }

  const ttl = params.get('ttl')
  if (ttl !== null && !Number.isNaN(Number(ttl))) {
    metadata.ttl = Number(ttl)
  }

  const capabilityTags = params.getAll('capabilityTag')
  if (capabilityTags.length > 0) {
    metadata.capabilityTags = capabilityTags
  }

  return metadata
}

function hasSemanticConflict(id: string, oanMetadata: OanMetadata | undefined): boolean {
  if (!oanMetadata) return false

  const semanticCode = getSemanticCode(id)
  if (!semanticCode) return true

  const subjectCode = semanticCode.slice(0, 2)
  const expectedType = OAN_SUBJECT_TYPE_BY_CODE[subjectCode]
  if (!expectedType) return false

  const declaredSubjectType = typeof oanMetadata.subjectType === 'string' ? oanMetadata.subjectType : undefined
  const declaredResourceType = typeof oanMetadata.resourceType === 'string' ? oanMetadata.resourceType : undefined

  if (declaredSubjectType && declaredSubjectType !== expectedType) return true
  if (declaredResourceType && declaredResourceType !== expectedType) return true

  return false
}

function buildOanDocumentMetadata(parsed: ParsedDID): DIDDocumentMetadata {
  const metadata: DIDDocumentMetadata = {}
  if (!parsed.query) return metadata

  const params = new URLSearchParams(parsed.query)
  const stringFields = ['created', 'updated', 'controllerState', 'networkScope', 'authorizationState', 'packageState']

  for (const field of stringFields) {
    const value = params.get(field)
    if (value !== null) metadata[field] = value
  }

  const versionId = params.get('versionId')
  if (versionId) metadata.versionId = versionId

  const deactivated = params.get('deactivated')
  if (deactivated === 'true') metadata.deactivated = true
  if (deactivated === 'false') metadata.deactivated = false

  return metadata
}

function createOanDocument(did: string, oanMetadata?: OanMetadata): OanDocument {
  const doc: OanDocument = {
    '@context': OAN_CONTEXT,
    id: did,
  }

  if (oanMetadata && Object.keys(oanMetadata).length > 0) {
    doc.oanMetadata = oanMetadata
  }

  return doc
}

function normalizeOanMetadata(defaultOanMetadata: OanMetadata | undefined, parsed: ParsedDID): OanMetadata {
  const queryMetadata = parseOanQueryMetadata(parsed)
  return {
    ...getDefaultOanMetadataFromId(normalizeOanId(parsed.id)),
    ...(defaultOanMetadata || {}),
    ...queryMetadata,
  }
}

export function getResolver(options: OanResolverOptions = {}): ResolverRegistry {
  const documents = options.documents || {}
  const defaultOanMetadata = options.defaultOanMetadata

  async function resolve(
    did: string,
    parsed: ParsedDID,
    _resolver: Resolvable,
    _options: DIDResolutionOptions
  ): Promise<DIDResolutionResult> {
    if (parsed.method !== OAN_METHOD) {
      return {
        didResolutionMetadata: { error: 'unsupportedDidMethod' },
        didDocument: null,
        didDocumentMetadata: {},
      }
    }

    const normalizedId = normalizeOanId(parsed.id)
    if (!OAN_DID_ID_RE.test(normalizedId)) {
      return {
        didResolutionMetadata: { error: 'invalidDid' },
        didDocument: null,
        didDocumentMetadata: {},
      }
    }

    const canonicalDid = `did:${OAN_METHOD}:${normalizedId}`
    const registered = documents[did] || documents[canonicalDid]
    if (registered) {
      if (hasSemanticConflict(normalizedId, registered.oanMetadata)) {
        return {
          didResolutionMetadata: { error: 'invalidDid' },
          didDocument: null,
          didDocumentMetadata: {},
        }
      }

      return {
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
        didDocument: registered,
        didDocumentMetadata: buildOanDocumentMetadata(parsed),
      }
    }

    const oanMetadata = normalizeOanMetadata(defaultOanMetadata, parsed)
    if (hasSemanticConflict(normalizedId, oanMetadata)) {
      return {
        didResolutionMetadata: { error: 'invalidDid' },
        didDocument: null,
        didDocumentMetadata: {},
      }
    }

    return {
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument: createOanDocument(canonicalDid, oanMetadata),
      didDocumentMetadata: buildOanDocumentMetadata(parsed),
    }
  }

  return {
    [OAN_METHOD]: resolve,
  }
}
