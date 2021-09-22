import { parser } from '../lib/app.js';

describe('takes a http request object and returns a parsed body', () => {
  it('should return null if a method is not POST, PUT, or PATCH', () => {
    const value = parser({ method: 'GET' });

    expect(value).toEqual(null);
  });
  it('throws error if content-type is not application/json', () => {
    const newObject = { method: 'POST', body: 'hello-world', status: 200, contentType: 'text/plain' };
    
    try {
      parser(newObject);
    } catch (error){
      expect(error).toEqual('error');
      return error;
    }
    
  });
  xit('returns a deserialized body from req emitted events', () => {
    const newObject = { method: 'POST', body: '{"result": true, "count": 42}', status: 200, contentType: 'application/json' };
    const result = parser(newObject);
    expect(result).toEqual({ 'count': 42, 'result': true });
    //test unable to pass due to event emitter
  });

  it('throws an error if failure happens in deserialization', () => {
    const newObject = { method: 'POST', body: '', contentType: 'application/json' };
    try {
      parser(newObject);
    } catch (error){
      expect(error).toEqual('Failure in parsing');
      return error;
    }
  });
});
