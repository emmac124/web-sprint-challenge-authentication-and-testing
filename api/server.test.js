const request = require("supertest");
const User = require("./auth/auth-model");
const db = require("../data/dbConfig");
const server = require("./server");

const user1 = { username: "emma", password: "1234" };
const user2 = { username: "user2", password: "1234" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("[POST] on /register", () => {
  test("Adds user to db", async () => {
    let all;
    await User.insert(user1);
    all = await db("users");
    expect(all).toHaveLength(1);

    await User.insert(user2);
    all = await db("users");
    expect(all).toHaveLength(2);
  });

  test("Resolves to added user", async () => {
    const user = await User.insert(user1);
    expect(user[0]).toMatchObject(user1);
  });
});

describe("[GET] on /jokes", () => {
  test("status code 200 ok", async () => {

  })
  test("returns the right number of jokes", async () => {
    
  })
})