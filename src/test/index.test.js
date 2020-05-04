const request = require("supertest");
const server = require("../index");

// Check '/' page
describe("Get Endpoints", () => {
  it("Get", async (done) => {
    const res = await request(server).get("/").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nome");
    done();
  });
});

// Test case for checking api work or not
describe("Get /api", () => {
  it("/api", async (done) => {
    var res = await await request(server).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// Test case for checking login function with true name and password.
describe("Post /api/login", () => {
  it("login status", async (done) => {
    const res = await request(server).post("/api/login").send({
      name: "test",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    done();
  });
});

// Test case for checking login function with wrong name and password.
describe("Post /api/login", () => {
  it("login status", async (done) => {
    const res = await request(server).post("/api/login").send({
      name: "admin",
      password: "admin123456",
    });
    expect(res.statusCode).toEqual(403);
    done();
  });
});

// Test case for checking posts function with token
describe("Post /api/posts", () => {
  it("Create a new posts", async (done) => {
    const loginKey = await request(server).post("/api/login").send({
      name: "test",
      password: "123456",
    });

    const res = await request(server)
      .post("/api/posts")
      .set("authorization", `bearer ${loginKey.body.token}`)
      .send({
        data: "Hello World",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    done();
  });
});

// Test case for checking posts function with error token
describe("Post /api/posts", () => {
  it("Create a new posts", async (done) => {
    const loginKey = await request(server).post("/api/login").send({
      name: "admin",
      password: "admin123456",
    });

    const res = await request(server)
      .post("/api/posts")
      .set("authorization", `bearer ${loginKey.body.token}`)
      .send({
        data: "Hello World",
      });

    expect(res.statusCode).toEqual(403);
    done();
  });
});

// Test case for checking posts function empty token
describe("Post /api/posts", () => {
  it("Create a new posts", async (done) => {
    const res = await request(server).post("/api/posts").send({
      data: "Hello World",
    });

    expect(res.statusCode).toEqual(403);
    done();
  });
});

afterAll(async (done) => {
  // close server conection
  server.close();
  done();
});
