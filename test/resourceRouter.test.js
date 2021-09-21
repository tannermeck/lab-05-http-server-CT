import request from 'supertest';
import resourceRouter from '../lib/app.js';
import { rm, mkdir } from 'fs/promises';

describe('test the pathways of GET, POST, PUT, and Delete', () => {
  const rootDir = './store/cats';

  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });
  
  xit('returns all cats with GET /cats', () => {
    const cats = request(resourceRouter).get('/cats');

    expect(cats.body).toEqual();
  });
});
