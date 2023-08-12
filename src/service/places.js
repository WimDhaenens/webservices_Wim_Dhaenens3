const placesRepository = require('../repository/place');

const getAll = async () => {
  return await placesRepository.getAll();
//    return Promise.resolve ({ritten : RITTEN, aantal: RITTEN.length});
}

const getById = async(id) => {
  return await placesRepository.getPlaceById(id);
}

const createPlace = async(place) => {
  return await placesRepository.createPlace(place);
}

const updatePlace = async (id, place) => {
  return await placesRepository.updatePlace(id, place);
}

const deleteById = (id) => {
  return placesRepository.deletePlace(id);
}

module.exports = {
  getAll,
  getById,
  createPlace,
  updatePlace,
  deleteById
}