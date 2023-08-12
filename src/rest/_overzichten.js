const Router = require('@koa/router');
const overzichtenService = require('../service/overzichten');
const {
  getLogger
} = require('../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta)
};


const getOverzichten = async (ctx) => {
  debugLog('Alles overzichten worden opgehaald...');
  ctx.body = await overzichtenService.getAll();

  getLogger().info('U bent bij de api/overzichten terecht gekomen...');
};

const getTreinById = async (ctx) => {
  const id = ctx.params.id;
  debugLog(`Overzicht met id ${id} wordt opgehaald...`);
  ctx.body = await overzichtenService.getById(id);
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/overzichten'
  }); //misschien moet api weg ????
  router.get('/', getOverzichten);
  // router.post('/', createTrein);
   router.get('/:id', getTreinById);
  // router.delete('/:id', deleteTrein);
  // router.put('/:id', updateTrein);

  app.use(router.routes());
  app.use(router.allowedMethods());
}