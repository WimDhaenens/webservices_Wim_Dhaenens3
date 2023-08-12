const installTreinenRoutes = require('./_treinen');
const installRittenRoutes = require('./_ritten');
const installPlacesRoutes = require('./_places');
const installOverzichtenRoutes = require('./_overzichten');
const installHealthRoutes = require('./_health');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });
  installTreinenRoutes(router);
  installRittenRoutes(router);
  installPlacesRoutes(router);
  installHealthRoutes(router);
  installOverzichtenRoutes(router);
  app.use(router.routes());
  app.use(router.allowedMethods());
}