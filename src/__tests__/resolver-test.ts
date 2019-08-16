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
      })
      expect(
        parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path'),
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path',
        path: '/some/path',
      })
      expect(
        parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123'),
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123',
        fragment: 'fragment=123',
      })
      expect(
        parse(
          'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123',
        ),
      ).toEqual({
        method: 'uport',
        id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        did:
          'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123',
        path: '/some/path',
        fragment: 'fragment=123',
      })
      expect(
        parse('did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'),
      ).toEqual({
        method: 'nacl',
        id: 'Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
        did: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
      })
    })

    it('fails if non compliant', () => {
      expect(() => parse('')).toThrowError(`Missing DID`)
      expect(() => parse('did:')).toThrowError(`Invalid DID did:`)
      expect(() => parse('did:uport')).toThrowError(`Invalid DID did:uport`)
      expect(() => parse('did:uport:')).toThrowError(`Invalid DID did:uport:`)
      expect(() => parse('did:uport:1234_12313***')).toThrowError(
        `Invalid DID did:uport:1234_12313***`,
      )
      expect(() => parse('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toThrowError(
        `Invalid DID 2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX`,
      )
    })
  })

  describe('resolve', () => {
    let resolver: Resolver
    beforeAll(() => {
      resolver = new Resolver({
        example: async (did, parsed) => ({
          '@context': 'https://w3id.org/did/v1',
          id: did,
          publicKey: [
            {
              id: 'owner',
              owner: '1234',
              type: 'xyz',
            },
          ],
        }),
      })
    })

    it('fails on unhandled methods', async () => {
      await expect(
        resolver.resolve('did:borg:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX'),
      ).rejects.toEqual(new Error("Unsupported DID method: 'borg'"))
    })

    it('fails on parse error', async () => {
      await expect(resolver.resolve('did:borg:')).rejects.toEqual(
        new Error('Invalid DID did:borg:'),
      )
    })

    it('resolves did document', async () => {
      await expect(resolver.resolve('did:example:123456789')).resolves.toEqual({
        '@context': 'https://w3id.org/did/v1',
        id: 'did:example:123456789',
        publicKey: [
          {
            id: 'owner',
            owner: '1234',
            type: 'xyz',
          },
        ],
      })
    })
  })
})
