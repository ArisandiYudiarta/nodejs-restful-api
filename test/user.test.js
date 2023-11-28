import supertest from "supertest";
import { web } from "../src/application/web.js";
// import { prismaClient } from "../src/application/database.js";
import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
import { logger } from "../src/application/logging.js";

//unit test register
describe("POST /api/users", () => {
    afterEach(async () => {
        await removeTestUser();
    });
    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "test",
            password: "pass",
            name: "test",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "",
            password: "",
            name: "",
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined;
    });
});

describe("POST /api/users/login", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can login", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "test",
            password: "pass",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });
});

describe("GET /api/users/current", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can get current user", async () => {
        const result = await supertest(web).get("/api/users/current").set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

    it("should reject if the token is invalid", async () => {
        const result = await supertest(web).get("/api/users/current").set("Authorization", "tokensalah");

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/users/logout", function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can logout", async () => {
        const result = await supertest(web).delete("/api/users/logout").set("Authorization", "test");

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it("should reject logout if token is invalid", async () => {
        const result = await supertest(web).delete("/api/users/logout").set("Authorization", "tokeninvalid");

        expect(result.status).toBe(401);
    });
});
