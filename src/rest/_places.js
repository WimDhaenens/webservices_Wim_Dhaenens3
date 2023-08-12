const Router = require('@koa/router');
const placesService = require('../service/places');

const getPlaces = async (ctx) => {
  // ctx.body = ('test wim');
  ctx.body = await placesService.getAll();
};

const getPlaceById = async (ctx) => {
  ctx.body = await placesService.getById(ctx.params.id)
};

const createPlace = async (ctx) => {
  ctx.body = await placesService.createPlace(ctx.request.body);
  ctx.status = 201;
};

const updatePlace = async (ctx) => {
  ctx.body = placesService.updatePlace(ctx.params.id, ctx.request.body);
};

const deletePlace = async (ctx) => {
  placesService.deleteById(ctx.params.id);
  ctx.response.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/places'
  });
  router.get('/', getPlaces);
  router.get('/:id', getPlaceById);
  router.post('/', createPlace);
  router.put('/:id', updatePlace);
  router.delete('/:id', deletePlace);
  app.use(router.routes());
  app.use(router.allowedMethods());
}