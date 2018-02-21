import resolve, {parse, registerMethod} from '../resolver'

describe('resolver', () => {
  describe('parse()', () => {
    it('returns parts', () => {
      expect(parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toEqual({method: 'uport', id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX'})
      expect(parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path')).toEqual({method: 'uport', id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path', path: '/some/path'})
      expect(parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123')).toEqual({method: 'uport', id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123', fragment: 'fragment=123'})
      expect(parse('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123')).toEqual({method: 'uport', id: '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', did: 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'})
    })

    it('fails if non compliant', () => {
      expect(() => parse()).toThrowError(`Missing DID`)
      expect(() => parse('')).toThrowError(`Missing DID`)
      expect(() => parse('did:')).toThrowError(`Invalid DID did:`)
      expect(() => parse('did:uport')).toThrowError(`Invalid DID did:uport`)
      expect(() => parse('did:uport:')).toThrowError(`Invalid DID did:uport:`)
      expect(() => parse('did:uport:1234_12313***')).toThrowError(`Invalid DID did:uport:1234_12313***`)
      expect(() => parse('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toThrowError(`Invalid DID 2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX`)
    })
  })

  describe('resolve', () => {
    registerMethod('example', async (did, parsed) => ({
      '@context': 'https://w3id.org/did/v1',
      id: did
    }))

    it('fails on unhandled methods', async () => {
      await expect(resolve('did:borg:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).rejects.toEqual(new Error('Unsupported DID method: \'borg\''))
    })
    
    it('fails on parse error', async () => {
      await expect(resolve('did:borg:')).rejects.toEqual(new Error('Invalid DID did:borg:'))
    })

    it('resolves did document', async () => {
      await expect(resolve('did:example:123456789')).resolves.toEqual({
        '@context': 'https://w3id.org/did/v1',
        id: 'did:example:123456789'
      })
    })
  })
})
