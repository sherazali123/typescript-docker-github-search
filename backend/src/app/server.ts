import app from './app';
import config from '../config';
import { Redis } from './../component/redis';

const redis = new Redis();

(async () => {
  try {
    redis.connect();

    app.listen(config.server.port, () =>
      console.log(
        `Server running at ${config.server.port}. Open the link in browser http://${config.server.host}:${config.server.port} `
      )
    );

    process.on('SIGINT', async () => {
      try {
        process.exit(0);
      } catch (e) {
        process.exit(1);
      }
    });
  } catch (e) {
    console.log(e);
  }
})();
