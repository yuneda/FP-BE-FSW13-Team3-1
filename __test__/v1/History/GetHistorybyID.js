const request = require("supertest");
const app = require("../../../app");
const { History } = require("../../../app/models");
let history;

describe("GET, /api/v1/product", () => {
  beforeAll(async () => {
    history = await History.create({
      id_product: 2,
      id_buyer: 3,
      id_offer: 29,
      bid_price: 12323,
    });
  });
  afterAll(() => history.destroy());
  it("Add history with status code 201", async () =>
    request(app)
      .get(`/api/v1/history/${history.id}`)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          status: expect.any(String),
          data: expect.any(Object),
        });
      }));
});
