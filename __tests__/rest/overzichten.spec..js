const supertest = require('supertest');
const createServer = require('../../src/createServer');
const {
  initializeDatabase
} = require('../../src/data/index');
const {
  getKnex,
  tables
} = require('../../src/data/index');

const data = {
  ritten: [{
    id: 1000,
    date: new Date(2023, 8, 8, 12, 0),
    placeVanId: 1000,
    placeVanName: 'Deinze',
    placeNaarId: 1001,
    placeNaarName: 'Kouter',
    treinNummer: '007',
  }],
  places: [{
      id: 1000,
      naam: 'Deinze',
    },
    {
      id: 1001,
      naam: 'Kouter',
    },
  ],
  treinen: [{
    nummer: '007',
    typeNaam: 'Hond',
    aandrijving: 'water',
    type: 'trekbeest',
    eigenaar: 'Wijzelf',
    huurder: 'Moeke',
    rating: 5,
    foto: null
  }],
}

const dataToDestroy = {
  ritten: [1000],
  places: [1000, 1001],
  treinen: ['007'],
};

describe('ritten', () => {
  let server;
  let request;
  let knex;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
    knex = await getKnex();
  });
  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/overzichten';
  describe('GET /api/overzichten', () => {
    beforeAll(async () => {
      await knex(tables.rit).insert(data.ritten);
      await knex(tables.station).insert(data.places);
      await knex(tables.trein).insert(data.treinen);
    });
    afterAll(async () => {
      await knex(tables.rit).whereIn('id', dataToDestroy.ritten).del();
      await knex(tables.station).whereIn('id', dataToDestroy.places).del();
      await knex(tables.trein).whereIn('nummer', dataToDestroy.treinen).del();
    });

    it('should return 200 OK and overzicht alle ritten', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      //     expect(response.body.items.length).toBe(4);
    });

  })
  const url2 = '/api/ritten';
  describe('POST /api/ritten', () => {
    let treinTodelete;
    let placeTodelete;
    let ritTodelete;
    beforeAll(async () => {
      await knex(tables.station).insert(data.places);
      await knex(tables.trein).insert(data.treinen);
    });

    afterAll(async () => {
      await knex(tables.rit).whereIn('id', ritTodelete).del();
      //   await knex(tables.station).whereIn('id', placeTodelete).del();
      //   await knex(tables.trein).whereIn('nummer', treinTodelete).del();
    });

    it('should return 201 OK and create a new rit', async () => {
      const response = await request.post(url2)
        .send({
          date: "2023-08-09 00:00:00",
          placeVanId: "5",
          placeVanName: "Kouter",
          placeNaarId: "6",
          placeNaarName: "Bad Isle",
          treinNummer: "007",
        });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.date).toBe("2023-08-08T22:00:00.000Z");
      expect(response.body.placeVanId).toBe(5);
      expect(response.body.placeNaarId).toBe(6);
      expect(response.body.treinNummer).toBe('007');
      ritTodelete.push(response.body.id);
    });



  });
});