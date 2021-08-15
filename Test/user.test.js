const should = require("should");
const request = require("supertest");
const app = require("../app");

describe("User 관련 Test", () => {
  describe("GET /user -> 모든 유저 출력", () => {
    describe("성공 시", () => {
      it("응답 번호 200을 반환", (done) => {
        request(app).get("/user").expect(200).end(done);
      });

      it("유저를 반환하며, [id, email, password, nickname, age, sex, profile_image_url]이 있어야함.", (done) => {
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
                "nickname",
                "age",
                "sex",
                "profile_image_url"
              );
            });
            done();
          });
      });
    });
  });

  describe("POST /user -> 회원가입", () => {
    describe("성공 시", () => {
      before((done) => {
        request(app)
          .post("/user")
          .send({
            email: "test1@gmail.com",
            password: "test1!",
            nickname: "test1",
            age: 25,
            sex: "M",
          })
          .expect(201)
          .end((err, res) => {
            body = res.body;
            done();
          });
      });

      it("추가된 user 반환", (done) => {
        body.result.should.have.properties("id", "email");
        body.result.email.should.be.equal("test1@gmail.com");

        done();
      });
    });
  });
});
