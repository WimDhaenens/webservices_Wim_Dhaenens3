const { getLogger } = require('../core/logging');
let {
  RITTEN,
  TREINEN
} = require('../data/mock_data_treinen');

const treinRepository = require('../repository/trein');

const getAll = async () => {
  const treins= await treinRepository.getAll();
  return {'treinen': treins, 'count': treins.length};
  // return {
  //   treinen: TREINEN,
  //   ritten: RITTEN,
  //   treinenCount: TREINEN.length,
  //   rittenCount: RITTEN.length
  // };
}


const getById = async (nummer) => {
  let trein;
  //trein = TREINEN.find((t) => t.id === parseInt(id));
  trein = await treinRepository.getById(nummer);
  if (trein) return trein;
  else return (`trein met ${id} is niet in de database...`);
}

const updateById = async (nummer,items) => {
  let treinUpdated;
  treinUpdated = await treinRepository.updateTrein(nummer, items)
  if (!treinUpdated) {
    return (`de trein met ${nummer} bestaat niet.`);
    } else {
  return treinUpdated;
}
}

const createTrein = async (items) => {
  getLogger().info(`wim1 : ${JSON.stringify(items)}`);
  let nieuwTreintje
try {
  nieuwTreintje =await treinRepository.createTrein(  items
  );
} catch (error) {return error}
  return (nieuwTreintje);
};

const deleteById = async(nummer) => {
  await treinRepository.deleteById(nummer);
  //TREINEN = TREINEN.filter(t => t.id !== parseInt(id));
}

module.exports = {
  getAll,
  getById,
  createTrein,
  updateById,
  deleteById
}