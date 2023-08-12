const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const {
  initializeLogger,
  getLogger
} = require('./core/logging');
const installRest = require('./rest/index');
const {
  initializeDatabase
} = require('./data/index');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORGIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const createServer = require('./createServer');

const main = async () => {
  try {
    const server = await createServer();
    await server.start();

    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);

  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};

//   initializeLogger({
//     level: LOG_LEVEL,
//     disabled: LOG_DISABLED,
//     defaultMeta: {
//       NODE_ENV
//     },
//   });


//   await initializeDatabase();
//   const app = new Koa();

//   const logger = getLogger('index');
//   app.use(koaCors({
//     origin: (ctx) => {
//       if (CORS_ORGIGINS.indexOf(ctx.request.header.origin) !== -1) {
//         return ctx.request.header.origin;
//       }
//       return CORS_ORGIGINS[0];
//     },
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
//     maxAge: CORS_MAX_AGE,
//   })); //Als eerste app toevoegen. Nodig om CORS te kunnen gebruiken



//   app.use(bodyParser()); //Als eerste app toevoegen.nodig om de body van een request te kunnen lezen
//   installRest(app);


//   app.listen(9000);
//   logger.info('Server is gestart op http://localhost:9000');
// }

main();




//deel3_2 opname, 33:48 minuten...
//Kijken naar opgave in deel3_2 01:12:00
//tot 57:51 minuten... deel 4 opname