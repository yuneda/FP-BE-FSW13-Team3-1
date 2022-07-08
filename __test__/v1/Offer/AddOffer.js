const request = require("supertest");
const app = require("../../../app");
const { Offer, Product, History } = require("../../../app/models");

describe("POST, /api/v1/offer", () => {
  let tokenUser;
  let falseToken = "abcdef";
  let product;
  let loginBuyer;

  beforeAll(async () => {
    product = await Product.create({
      id_user: 1,
      product_name: "jam_mehong",
      product_price: 1000000,
      category: "string",
      description: "JAM AMAHAL BANGET",
      image: null,
      status: "available",
    });

    loginBuyer = await request(app).post("/api/v1/login").send({
      email: "lailla@gmail.com",
      password: "123456",
    });
    tokenUser = loginBuyer.body.token;
  });

  afterAll(async () => {
    await Offer.destroy({ where: { id_product: product.id } });
    await Product.destroy({ where: { id: product.id } });
    await History.destroy({ where: { id_product: product.id} });
  });

  it("Add offer with status code 201", async () =>
    request(app)
      .post("/api/v1/offer")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        id_user: loginBuyer.id,
        id_product: product.id,
        bid_price: 19000,
        id_seller: product.id_user,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          status: expect.any(String),
          data: expect.any(Object),
        });
      }));
});
