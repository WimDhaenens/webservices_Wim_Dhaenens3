const Router = require('@koa/router');
const treinenService = require('../service/treinstellen');
const {
  getLogger
} = require('../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta)
};


const getTreinen = async (ctx) => {
  debugLog('Alles treinen worden opgehaald...');
  ctx.body = await treinenService.getAll();

  getLogger().info('U bent bij de api/treinen terecht gekomen...');
};


const createTrein = async (ctx) => {
  getLogger().info(`wim0 : ${JSON.stringify(ctx.request.body)}`);
  ctx.body = await treinenService.createTrein(ctx.request.body);
  ctx.status = 201;
  // ctx.body = "is ontvzangen...";
};

const getTreinById = async (ctx) => {
  //logger.info(ctx.params.id);
  ctx.body = await treinenService.getById(ctx.params.id) //opgelet, id is niet geparsed... Is enkel een string

};

const deleteTrein = async (ctx) => {
  await treinenService.deleteById(ctx.params.id);
  ctx.status = 204; // delete is gelukt, maar er wordt geen inhoud teruggestuurd...
};

const updateTrein = async (ctx) => {
  // getLogger().info(`wim5: ${JSON.stringify(ctx.response)}`);
  // ctx.body = "We werken eraan...";
  ctx.body = treinenService.updateById(ctx.params.id, ctx.request.body);
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/treinen'
  }); //misschien moet api weg ????
  router.get('/', getTreinen);
  router.post('/', createTrein);
  router.get('/:id', getTreinById);
  router.delete('/:id', deleteTrein);
  router.put('/:id', updateTrein);

  app.use(router.routes());
  app.use(router.allowedMethods());
}