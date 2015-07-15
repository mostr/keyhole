import expect from 'expect';

import keyhole from '../src/keyhole';

describe('keyhole', () => {

  const source = { 
    name: 'john', 
    age: 29, 
    emails: {
      priv: 'priv@email.com',
      work: 'work@email.com',
    },
    foo: {
      bar: {
        baz: ['foo', 'bar', 'baz']
      }
    } 
  };

  describe('nonexistent or invalid properties', () => {

    it('should be ignored', () => {
      const res = keyhole(source, 'name', 'age', 'non.existent', 'emails.nonexistent');
      expect(res).toEqual({ name: 'john', 'age': 29 });
    });

    it('should result with empty object when no properties given', () => {
      const res = keyhole(source);
      expect(res).toEqual({});
    });

  });

  describe('nested properties', () => {
    
    it('should be properly resolved', () => {
      const res = keyhole(source, 'emails.priv');
      expect(res).toEqual({ emails: { priv: 'priv@email.com' } });
    });

    it('should be copied as a whole', () => {
      const res = keyhole(source, 'emails');
      expect(res).toEqual({ emails: { priv: 'priv@email.com', work: 'work@email.com' } });
    });

    it('should be resolved at any depth', () => {
      const res = keyhole(source, 'foo.bar.baz');
      expect(res).toEqual({ foo: { bar: { baz: ['foo', 'bar', 'baz'] } } });
    });

  });

});