const should = require("should");
const request = require("supertest");
const app = require("../app");

describe("Test about user", () => {
  describe("/user", () => {
    describe("GET /user", () => {
      describe("성공 시", () => {
        it("응답 번호 200을 반환", (done) => {
          request(app).get("/user").expect(200).end(done);
        });

        it("유저 배열을 반환", (done) => {
          request(app)
            .get("/user")
            .expect(200)
            .end((err, res) => {
              res.body.should.be.an.instanceof(Object);
              res.body.result.map((user) => {
                user.should.have.properties(
                  "id",
                  "email",
                  "password",
                  "name",
                  "age",
                  "sex",
                  "nickname",
                  "profile_image_url"
                );
              });
              done();
            });
        });
      });
    });
  });
});
