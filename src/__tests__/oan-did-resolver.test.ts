import { describe, expect, it } from 'vitest'
import { Resolver } from '../resolver'
import { getResolver, OanDocument } from '../oan-did-resolver'

describe('did:oan resolver', () => {
  it('resolves a minimal did:oan document', async () => {
    const resolver = new Resolver(getResolver())
    const did = 'did:oan:AGFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz'

    const result = await resolver.resolve(did)

    expect(result).toEqual({
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument: {
        '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/oan/v1'],
        id: did,
        oanMetadata: {
          subjectType: 'agent_service',
          resourceType: 'agent_service',
        },
      },
      didDocumentMetadata: {},
    })
  })

  it('normalizes lowercase semantic codes to the canonical identifier', async () => {
    const resolver = new Resolver(getResolver())
    const result = await resolver.resolve('did:oan:agfi:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz')

    expect(result.didDocument?.id).toBe('did:oan:AGFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz')
  })

  it('returns invalidDid for malformed did:oan identifiers', async () => {
    const resolver = new Resolver(getResolver())
    const result = await resolver.resolve('did:oan:AGF:bad')

    expect(result).toEqual({
      didResolutionMetadata: { error: 'invalidDid' },
      didDocument: null,
      didDocumentMetadata: {},
    })
  })

  it('applies default metadata and query overrides', async () => {
    const resolver = new Resolver(
      getResolver({
        defaultOanMetadata: {
          subjectType: 'agent_service',
          resourceType: 'agent_service',
          capabilityTags: ['finance.report.analysis'],
          networkScope: 'global',
        },
      })
    )

    const did =
      'did:oan:AGFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz?versionId=v1&created=2026-06-01T00:00:00Z&capabilityTag=finance.risk.summary&lifecycleState=active'
    const result = await resolver.resolve(did)

    expect(result.didResolutionMetadata).toEqual({ contentType: 'application/did+ld+json' })
    expect(result.didDocument).toEqual({
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/oan/v1'],
      id: 'did:oan:AGFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz',
      oanMetadata: {
        subjectType: 'agent_service',
        resourceType: 'agent_service',
        capabilityTags: ['finance.risk.summary'],
        networkScope: 'global',
        lifecycleState: 'active',
      },
    })
    expect(result.didDocumentMetadata).toEqual({
      versionId: 'v1',
      created: '2026-06-01T00:00:00Z',
    })
  })

  it('returns a registered document from the local registry', async () => {
    const did = 'did:oan:INFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz'
    const registeredDoc: OanDocument = {
      '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/oan/v1'],
      id: did,
      oanMetadata: {
        subjectType: 'infrastructure_node',
        resourceType: 'infrastructure_node',
        nodeRole: 'registrar',
      },
    }

    const resolver = new Resolver(getResolver({ documents: { [did]: registeredDoc } }))
    const result = await resolver.resolve(did)

    expect(result).toEqual({
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument: registeredDoc,
      didDocumentMetadata: {},
    })
  })

  it('rejects metadata that conflicts with the semantic subject code', async () => {
    const resolver = new Resolver(
      getResolver({
        defaultOanMetadata: {
          subjectType: 'skill',
          resourceType: 'skill',
        },
      })
    )

    const result = await resolver.resolve('did:oan:AGFI:7YpQm9Kx2VnRb6Ts3WfHa4Cd5Ej8LgNz')

    expect(result).toEqual({
      didResolutionMetadata: { error: 'invalidDid' },
      didDocument: null,
      didDocumentMetadata: {},
    })
  })
})
