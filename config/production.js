module.exports = {
  log: {
    level: 'info',
    disabled: false
  },
  database: {
    host: 'localhost',
    port: 3306,
    database: 'treinworld',
    client: 'mysql2',
  },

  cors: {
    //   origins: ['*'], //Iedereen heeft toegang
    //    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
};