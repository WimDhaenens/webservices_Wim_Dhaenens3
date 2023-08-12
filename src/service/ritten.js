let {
  RITTEN
} = require('../data/mock_data_treinen.js');

const rittenRepository = require('../repository/rit');

const getAll = async () => {
  return await rittenRepository.getAll();
//    return Promise.resolve ({ritten : RITTEN, aantal: RITTEN.length});
}

const getById = async(id) => {
  let rittenWithId = await rittenRepository.getRitById(id);
   if (!rittenWithId) throw new Error(`Rit met id ${id} niet gevonden`);
   return rittenWithId;
}

const createRit = async(rit) => {  
 return  await rittenRepository.createRit(rit);
  //return rit;
}

const deleteById = (id) => {
  return rittenRepository.deleteRit(id);
//  RITTEN = RITTEN.filter((rit) => rit.id != id);
}

const updateRit = async (id, rit) => {
  return await rittenRepository.updateRit(id, rit);

  // let bestaandeRit = getById(id);
  // bestaandeRit = rit;  
  // return bestaandeRit;
}

module.exports = {
  getAll,
  getById,
  createRit,
  deleteById,
  updateRit
}