// 2 endpoints definieren
// 1. ophalen van alle ritten
// 2. update van een rit

const Router = require('@koa/router');
const rittenService = require('../service/ritten');

const getRitten = async (ctx) => {
  ctx.body = await rittenService.getAll();
};

const getRitById = async (ctx) => {
  ctx.body = await rittenService.getById(ctx.params.id)
};

const createRit = async (ctx) => {
  ctx.body = await rittenService.createRit(ctx.request.body);
  ctx.status = 201;
};

const updateRit = async (ctx) => {
  ctx.body = rittenService.updateRit(ctx.params.id, ctx.request.body);
};

const deleteRit = async (ctx) => {
  rittenService.deleteById(ctx.params.id);
  ctx.response.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/ritten'
  });
  router.get('/', getRitten);
  router.get('/:id', getRitById);
  router.post('/', createRit);
  router.put('/:id', updateRit);
  router.delete('/:id', deleteRit);
  app.use(router.routes());
  app.use(router.allowedMethods());
}