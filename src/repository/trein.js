const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const getAll = async () => {
  getLogger().info(`welke tabel: ${tables.trein}`);
  const treinen = await getKnex().select('*').from(tables.trein).orderBy('nummer', 'asc');
 // const query = `SELECT * FROM ${tables.trein}`;
  //getLogger().info(`query: ${query}`);
  //const treinen = await getKnex().raw (`SELECT * FROM ${tables.trein}`);
  //getLogger().info(`treinen: ${treinen}`);
  return treinen;
}

const getById = async (nummer) => {
 // getLogger().info(`welke tabel: ${tables.trein}`);
  const trein = await getKnex().select('*').from(tables.trein).where('nummer', nummer);
 // const query = `SELECT * FROM ${tables.trein}`;
  //getLogger().info(`query: ${query}`);
  //const treinen = await getKnex().raw (`SELECT * FROM ${tables.trein}`);
  //getLogger().info(`treinen: ${treinen}`);
  return trein;
}

const createTrein = async (trein) => {
  getLogger().info(`wim2 : ${JSON.stringify(trein)}`);
  const treinCreated = await getKnex().insert(trein).into(tables.trein);
 // getLogger().info(`wim4 : ${JSON.stringify(treinCreated)}`);
  if (treinCreated.sqlMessage) {//Wim... werkt nog niet 
    return (treinCreated.sqlMessage);
  }
  return (await getById(trein.nummer));
}

  const updateTrein = async (nummer, items) => {  //Wim... werkt nog niet 
   try {
    await getKnex().update(items).from(tables.trein).where('nummer', nummer);
   } catch (error) {return error}
    return (await getById(nummer));
  }

  const deleteById = async (nummer) => {
    await getKnex().delete().from(tables.trein).where('nummer', nummer);
  }


module.exports = {
  getAll,
  getById,
  createTrein,
  updateTrein,
  deleteById
}