/* eslint-disable @typescript-eslint/no-explicit-any */
import app from '../app/app';
import supertest from 'supertest';
import { Server } from 'http';

let server: Server;
let request: any;
describe('Start server', () => {
  server = app.listen(3000);
  request = supertest(server);
});

describe('GET /api/clear-cache - a simple api endpoint', () => {
  it('Clear All Cache', async () => {
    const { body }: any = await request.get('/api/clear-cache');
    expect(body.clear).toEqual(true);
  });
});

// const query = 'tadeling' + time();

// describe('POST /api/search - a simple api endpoint', () => {
//   it('Search Text from Github API', async () => {
//     const { body }: any = await request.post('/api/search', {
//       q: query,
//       type: 'repositories'
//     });
//     console.log('body', body);
//     expect(body.source).toEqual('github');
//   });
// });

// describe('POST /api/search - a simple api endpoint', () => {
//   it('Search Text from Redis API', async () => {
//     const { body }: any = await request.post('/api/search', {
//       q: query,
//       type: 'repositories'
//     });
//     expect(body.source).toEqual('redis');
//   });
// });

describe('Shutdown server', () => {
  server.close();
});
