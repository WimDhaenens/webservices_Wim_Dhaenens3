module.exports = {
  log: {
    level: 'silly',
    disabled: false,
  },
  database: {
    host: '127.0.0.1',
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