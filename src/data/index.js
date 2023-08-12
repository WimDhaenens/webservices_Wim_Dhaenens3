const knex = require('knex');
const config = require('config');
const { getLogger } = require('../core/logging');

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');
const DATABASE_DATABASE = config.get('database.database');
const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

let knexInstance;
// connectie met db, migreren, seeding
const initializeDatabase = async() => {

  const knexOptions = { 
    client: DATABASE_CLIENT,
    debug: isDevelopment,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_DATABASE,
    }
  }
   knexInstance = knex(knexOptions);
   //controleren of db up and running is
 
 try {
  await knexInstance.raw('select 1+1 as result');
  getLogger().info('Database is up and running');
 } catch (error) {
   getLogger().error('Database is not up and running',{ error });
   throw new  Error ('initializing database failed');
  }
}; 
  const getKnex = () => {
    if (!knexInstance) {
      throw new Error('Connection is not yet initialized');
    }
    return knexInstance;
  };

async function shutdownData() {
  getLogger().info('Shutting down database connection');
  await knexInstance.destroy();
  getLogger().info('Database connection is shut down');
  knexInstance = null;
}

  const tables = Object.freeze({
   trein : 'treinen',
    station : 'places',
    rit:  'ritten',
  });

  module.exports = {  
    initializeDatabase,
    getKnex,
    tables,
    shutdownData
  };

//tot hier deel4 40:00 minuten...