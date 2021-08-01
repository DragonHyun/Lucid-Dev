const should = require("should");
const request = require("supertest");
const app = require("../app");

describe("GET /user", () => {
  describe("성공시", () => {
    it("응답 번호 200을 반환", (done) => {
      request(app).get("/user").expect(200).end(done);
    });
  });
});
