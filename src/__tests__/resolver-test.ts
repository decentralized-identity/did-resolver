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

import { Resolver, parse } from '../resolver'

describe('resolver', () => {
  describe('parse()', () => {
    it('returns parts', () => {
      expect(parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        didUrl: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX'
      })
      expect(
        parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path')
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        didUrl: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path',
        path: '/some/path'
      })
      expect(
        parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123')
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        didUrl: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123',
        fragment: 'fragment=123'
      })
      expect(
        parse(
          'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123'
        )
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        didUrl:
          'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123',
        path: '/some/path',
        fragment: 'fragment=123'
      })
      expect(
        parse('did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI')
      ).toEqual({
        method: 'nacl',
        id: 'Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
        did: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
        didUrl: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'
      })
      expect(
        parse('did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high')
      ).toEqual({
        method: 'example',
        id: '21tDAKCERh95uGgKbJNHYp',
        did: 'did:example:21tDAKCERh95uGgKbJNHYp',
        didUrl: 'did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high',
        params: {
          service: 'agent',
          'foo:bar': 'high'
        }
      })
      expect(
        parse(
          'did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high?foo=bar'
        )
      ).toEqual({
        method: 'example',
        id: '21tDAKCERh95uGgKbJNHYp',
        didUrl:
          'did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high?foo=bar',
        did: 'did:example:21tDAKCERh95uGgKbJNHYp',
        query: 'foo=bar',
        params: {
          service: 'agent',
          'foo:bar': 'high'
        }
      })
      expect(
        parse(
          'did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1'
        )
      ).toEqual({
        method: 'example',
        id: '21tDAKCERh95uGgKbJNHYp',
        didUrl:
          'did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1',
        did: 'did:example:21tDAKCERh95uGgKbJNHYp',
        query: 'foo=bar',
        path: '/some/path',
        fragment: 'key1',
        params: {
          service: 'agent',
          'foo:bar': 'high'
        }
      })

      expect(
        parse(
          'did:example:test:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1'
        )
      ).toEqual({
        method: 'example',
        id: 'test:21tDAKCERh95uGgKbJNHYp',
        didUrl:
          'did:example:test:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1',
        did: 'did:example:test:21tDAKCERh95uGgKbJNHYp',
        query: 'foo=bar',
        path: '/some/path',
        fragment: 'key1',
        params: {
          service: 'agent',
          'foo:bar': 'high'
        }
      })
    })

    it('fails if non compliant', () => {
      expect(() => parse('')).toThrowError(`Missing DID`)
      expect(() => parse('did:')).toThrowError(`Invalid DID did:`)
      expect(() => parse('did:uport')).toThrowError(`Invalid DID did:uport`)
      expect(() => parse('did:uport:')).toThrowError(`Invalid DID did:uport:`)
      expect(() => parse('did:uport:1234_12313***')).toThrowError(
        `Invalid DID did:uport:1234_12313***`
      )
      expect(() => parse('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toThrowError(
        `Invalid DID 2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX`
      )
    })
  })

  describe('resolve', () => {
    let resolver: Resolver
    let mockmethod: any
    const mockReturn = Promise.resolve({
      '@context': 'https://w3id.org/did/v1',
      id: 'did:mock:abcdef',
      publicKey: [
        {
          id: 'owner',
          controller: '1234',
          type: 'xyz'
        }
      ]
    })
    beforeAll(() => {
      mockmethod = jest.fn().mockReturnValue(mockReturn)
      resolver = new Resolver({
        example: async (did, parsed) => ({
          '@context': 'https://w3id.org/did/v1',
          id: did,
          publicKey: [
            {
              id: 'owner',
              controller: '1234',
              type: 'xyz'
            }
          ]
        }),
        mock: mockmethod
      })
    })

    it('fails on unhandled methods', async () => {
      await expect(
        resolver.resolve('did:borg:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
      ).rejects.toEqual(new Error("Unsupported DID method: 'borg'"))
    })

    it('fails on parse error', async () => {
      await expect(resolver.resolve('did:borg:')).rejects.toEqual(
        new Error('Invalid DID did:borg:')
      )
    })

    it('resolves did document', async () => {
      await expect(resolver.resolve('did:example:123456789')).resolves.toEqual({
        '@context': 'https://w3id.org/did/v1',
        id: 'did:example:123456789',
        publicKey: [
          {
            id: 'owner',
            controller: '1234',
            type: 'xyz'
          }
        ]
      })
    })

    it('throws on null document', async () => {
      const nullRes = new Resolver({
        nuller: () => Promise.resolve(null)
      })

      await expect(nullRes.resolve('did:nuller:asdfghjk')).rejects.toEqual(
        new Error('resolver returned null for did:nuller:asdfghjk')
      )
    })

    describe('caching', () => {
      describe('default', () => {
        it('should not cache', async () => {
          mockmethod = jest.fn().mockReturnValue(mockReturn)
          resolver = new Resolver({
            mock: mockmethod
          })

          await expect(resolver.resolve('did:mock:abcdef')).resolves.toEqual({
            '@context': 'https://w3id.org/did/v1',
            id: 'did:mock:abcdef',
            publicKey: [
              {
                id: 'owner',
                controller: '1234',
                type: 'xyz'
              }
            ]
          })
          await expect(resolver.resolve('did:mock:abcdef')).resolves.toEqual({
            '@context': 'https://w3id.org/did/v1',
            id: 'did:mock:abcdef',
            publicKey: [
              {
                id: 'owner',
                controller: '1234',
                type: 'xyz'
              }
            ]
          })
          return expect(mockmethod).toBeCalledTimes(2)
        })
      })
    })

    describe('cache=true', () => {
      it('should cache', async () => {
        mockmethod = jest.fn().mockReturnValue(mockReturn)
        resolver = new Resolver(
          {
            mock: mockmethod
          },
          true
        )

        await expect(resolver.resolve('did:mock:abcdef')).resolves.toEqual({
          '@context': 'https://w3id.org/did/v1',
          id: 'did:mock:abcdef',
          publicKey: [
            {
              id: 'owner',
              controller: '1234',
              type: 'xyz'
            }
          ]
        })
        await expect(resolver.resolve('did:mock:abcdef')).resolves.toEqual({
          '@context': 'https://w3id.org/did/v1',
          id: 'did:mock:abcdef',
          publicKey: [
            {
              id: 'owner',
              controller: '1234',
              type: 'xyz'
            }
          ]
        })
        return expect(mockmethod).toBeCalledTimes(1)
      })

      it('should respect no-cache', async () => {
        mockmethod = jest.fn().mockReturnValue(mockReturn)
        resolver = new Resolver(
          {
            mock: mockmethod
          },
          true
        )

        await expect(resolver.resolve('did:mock:abcdef')).resolves.toEqual({
          '@context': 'https://w3id.org/did/v1',
          id: 'did:mock:abcdef',
          publicKey: [
            {
              id: 'owner',
              controller: '1234',
              type: 'xyz'
            }
          ]
        })
        await expect(
          resolver.resolve('did:mock:abcdef;no-cache=true')
        ).resolves.toEqual({
          '@context': 'https://w3id.org/did/v1',
          id: 'did:mock:abcdef',
          publicKey: [
            {
              id: 'owner',
              controller: '1234',
              type: 'xyz'
            }
          ]
        })
        return expect(mockmethod).toBeCalledTimes(2)
      })

      it('should not cache null docs', async () => {
        mockmethod = jest.fn().mockReturnValue(null)
        resolver = new Resolver(
          {
            mock: mockmethod
          },
          true
        )

        await expect(resolver.resolve('did:mock:abcdef')).rejects.toEqual(
          new Error('resolver returned null for did:mock:abcdef')
        )
        await expect(resolver.resolve('did:mock:abcdef')).rejects.toEqual(
          new Error('resolver returned null for did:mock:abcdef')
        )
        return expect(mockmethod).toBeCalledTimes(2)
      })
    })
  })
})
