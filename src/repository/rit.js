const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const getAll = async () => {
  getLogger().info(`welke tabel: ${tables.rit}`);
  const ritten = await getKnex().select('*').from(tables.rit).orderBy('id', 'asc');
   return ritten;
}

const getRitById = async (id) => {
   const rit = await getKnex().select('*').from(tables.rit).where('id', id);
  return rit;
 }

const createRit = async (rit) => {
  const ritCreated = await getKnex().insert(rit).into(tables.rit);
  if (ritCreated.sqlMessage) {
    return (ritCreated.sqlMessage);
  }
  return (await getRitById(ritCreated[0]));
}

const updateRit = async (id, items) => {  //Wim... werkt nog niet
  try {
    await getKnex().update(items).from(tables.rit).where('id', id);
  } catch (error) {return error}
  return (await getRitById(id));
}

const deleteRit = async (id) => {
 getLogger().info(`wim2 : ${JSON.stringify(id)}`); 
  await getKnex().delete().from(tables.rit).where('id', id);
}


module.exports = {
  getAll,
  getRitById,
  createRit,
  updateRit,
  deleteRit
}