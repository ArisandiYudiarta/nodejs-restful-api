import supertest from "supertest";
import { web } from "../src/application/web.js";
// import { prismaClient } from "../src/application/database.js";
import { removeTestUser, createTestUser } from "./test-util.js";
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
