const {getKnex, tables} = require('../data/index');
const {getLogger} = require('../core/logging');

const getAll = async () => {
  getLogger().info(`welke tabel: ${tables.station}`);
  const plaatsen = await getKnex().select('*').from(tables.station).orderBy('id', 'asc');
   return {plaatsen :plaatsen, count:plaatsen.length};
}

const getPlaceById = async (id) => {
    return await getKnex().select('*').from(tables.station).where('id', id);
  //return plaats;
  }

const createPlace = async (place) => {
  const placeCreated = await getKnex().insert(place).into(tables.station);
  if (placeCreated.sqlMessage) {
    return (placeCreated.sqlMessage);
  }
  return (await getPlaceById(placeCreated[0]));
}  

const updatePlace = async (id, plaats) => { 
  try {
    await getKnex().update(plaats).from(tables.station).where('id', id);
  } catch (error) {return error}
  return (await getPlaceById(id));
}

const deletePlace = async (id) => {
  await getKnex().delete().from(tables.station).where('id', id);
}

module.exports = {
  getAll,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
}
