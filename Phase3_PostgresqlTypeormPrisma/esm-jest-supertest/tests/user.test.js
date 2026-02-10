import request from "supertest";
import app from "../app.js";

beforeEach(() => {
  app.resetUsers();
});

describe("User CRUD APIs", () => {

  test("POST /users - create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "Ragini" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ragini");
  });

  test("GET /users - get all users", async () => {
    await request(app).post("/users").send({ name: "User1" });

    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("GET /users/:id - get single user", async () => {
    await request(app).post("/users").send({ name: "User1" });

    const res = await request(app).get("/users/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("User1");
  });

  test("PUT /users/:id - update user", async () => {
    await request(app).post("/users").send({ name: "Old Name" });

    const res = await request(app)
      .put("/users/1")
      .send({ name: "New Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("New Name");
  });

  test("DELETE /users/:id - delete user", async () => {
    await request(app).post("/users").send({ name: "User1" });

    const res = await request(app).delete("/users/1");

    expect(res.statusCode).toBe(204);
  });

});
