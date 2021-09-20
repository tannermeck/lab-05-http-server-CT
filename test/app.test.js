import request from 'supertest';
import { app } from '../lib/app.js';

describe('test GET / route', () => {
  it('returns index.html when GET and / are called', async () => {
    const res = await request(app).get('/');

    expect(res.text).toEqual(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 id="h1">Hello from index.html</h1>
</body>
</html>`);
  });

  it('returns main.css file contents on GET /styles/main.css', async () => {
    const res = await request(app).get('/styles/main.css');

    expect(res.text).toEqual(`h1 {
    font-weight: bolder;
}`);
  });

  it('returns 404 from GET /bad-file', async () => {
    const res = await request(app).get('/bad-file');

    expect(res.status).toEqual(404);
  });
});
