// // Write your tests here
// test('sanity', () => {
//   expect(true).toBe(true)
// })

// const request = require("supertest")
// const db = require("./../data/dbConfig")
// const server = require("./server.js")

// const user1 = {username: "user1"}
// const user2 = {username: "user2"}

// beforeAll(async ()=>{
//   await db.migrate.rollback()
//   await db.migrate.latest()
// })
// beforeEach(async ()=>{
//   await db("users").truncate()
// })
// afterAll(async ()=>{
//   await db.destroy()
// })

// describe("server",()=>{
//   describe("[GET] /jokes",()=>{
//       it("responds with 200 ok", async ()=>{
//           const res = await request(server).get("/users")
//           expect(res.status).toBe(200)
//       })
      // it("returns right num o users", async ()=>{
      //     let res 
      //     await db("users").insert(user1)
      //     res = await request(server).get("/users")
      //     expect(res.body).toHaveLength(1)

      //     await db("users").insert(user2)
      //     res = await request(server).get("/users")
      //     expect(res.body).toHaveLength(2)
      // })
      // it("returns right format for users", async () => {
      //     await db("users").insert(user1)
      //     await db("users").insert(user2)
      //     const res = await request(server).get("/users")
      //     expect(res.body[0]).toMatchObject({id: 1, ...user1})
      //     expect(res.body[1]).toMatchObject({id: 2, ...user2})
      // })
//   })
// })
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

