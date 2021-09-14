const bcrypt = require("bcrypt");

const should = require("should");
const request = require("supertest");
const app = require("../app");

describe("User 관련 Test", () => {
  describe("GET /user -> 모든 유저 출력", () => {
    describe("성공 시", () => {
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
                "gender",
                "profile_image_url"
              );
            });
            done();
          });
      });
    });
  });

  describe("POST /user/signup -> 회원가입", () => {
    describe("성공 시", () => {
      const email = "signup@gmail.com";
      const password = "abcd1234!";
      const nickname = "signup";
      const age = 25;
      const gender = "M";

      before((done) => {
        request(app)
          .post("/user/signup")
          .send({
            email,
            password,
            nickname,
            age,
            gender,
          })
          .expect(200)
          .end((err, res) => {
            body = res.body;
            done();
          });
      });

      it("추가된 user 반환", async () => {
        body.result.should.have.properties("id", "email");
        const isSamePassword = await bcrypt.compare(
          password,
          body.result.password
        );
        isSamePassword.should.be.equal(true);
      });
    });

    describe("실패 시", () => {
      const duplicateEmail = "duplicate_email@gmail.com";
      const duplicateNickname = "duplicate_nickname";

      it("필수 입력 조건이 비어있을 경우 400 반환 & code=400", (done) => {
        request(app)
          .post("/user/signup")
          .send({})
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(400);
            done();
          });
      });

      it("email이 중복될 경우 400반환 & code=451", (done) => {
        request(app)
          .post("/user/signup")
          .send({
            email: duplicateEmail,
            password: "abcd1234!",
            nickname: "not_duplicate_nickname",
            age: 25,
            gender: "M",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(451);
            done();
          });
      });

      it("nickname이 중복될 경우 400반환 & code=452", (done) => {
        request(app)
          .post("/user/signup")
          .send({
            email: "not_duplicate_email",
            password: "abcd1234!",
            nickname: duplicateNickname,
            age: 25,
            gender: "M",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(452);
            done();
          });
      });
    });
  });

  describe("POST /user/signin -> 로그인", () => {
    describe("성공 시", () => {
      before((done) => {
        request(app)
          .post("/user/signin")
          .send({
            email: "signup@gmail.com",
            password: "abcd1234!",
          })
          .expect(200)
          .end((err, res) => {
            body = res.body;
            done();
          });
      });

      it("JWT 반환받아야 한다", (done) => {
        body.result.should.not.equal(null);

        done();
      });
    });

    describe("실패 시", () => {
      it("필수 입력 조건이 비어있을 경우 400 반환 & code=400", (done) => {
        request(app)
          .post("/user/signin")
          .send({})
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(400);
            done();
          });
      });

      it("이메일이 없는 경우 400반환 & code=490", (done) => {
        request(app)
          .post("/user/signin")
          .send({
            email: "no_eamil@gmail.com",
            password: "abcd1234!",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(490);

            done();
          });
      });

      it("비밀번호가 틀린 경우 400반환 & code=490", (done) => {
        request(app)
          .post("/user/signin")
          .send({
            email: "signup@gmail.com",
            password: "abcd!",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(490);

            done();
          });
      });
    });
  });

  describe("PATCH /user -> 회원정보 수정", () => {
    let jwt;

    //jwt 추출
    before((done) => {
      request(app)
        .post("/user/signin")
        .send({
          email: "test_update_user@gmail.com",
          password: "abcd1234!",
        })
        .expect(200)
        .end((err, res) => {
          jwt = res.body.result;
          done();
        });
    });

    describe("성공 시", () => {
      it("비밀번호 변경", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            type: "password",
            value: "update1234!",
          })
          .expect(200)
          .end(done);
      });

      it("닉네임 변경 -> 200 반환", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            type: "nickname",
            value: "after_update_nickname",
          })
          .expect(200)
          .end(done);
      });

      it("프로필 이미지 변경 -> 200 반환", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            type: "profile_image_url",
            value: "after_update_profile_image",
          })
          .expect(200)
          .end(done);
      });
    });

    describe("실패 시", () => {
      it("필수 입력 조건이 비어있을 경우 400 반환 & code=400", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({})
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(400);
            done();
          });
      });

      it("type값이 잘못된 값일 경우 400 반환 & code=401", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            type: "invalid_type",
            value: "new_nickname",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(401);
            done();
          });
      });

      it("중복된 nickname으로 변경 시 400 반환 & code=452", (done) => {
        request(app)
          .patch("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            type: "nickname",
            value: "duplicate_nickname",
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(452);
            done();
          });
      });
    });
  });

  describe("DELETE /user -> 회원탈퇴", () => {
    describe("성공 시", () => {
      let jwt;

      //jwt 추출
      before((done) => {
        request(app)
          .post("/user/signin")
          .send({
            email: "test_delete_user@gmail.com",
            password: "abcd1234!",
          })
          .expect(200)
          .end((err, res) => {
            jwt = res.body.result;
            done();
          });
      });

      it("200반환, 해당 아이디로 다시 로그인 시도시 code=490", (done) => {
        request(app)
          .delete("/user")
          .set({ Authorization: `Bearer ${jwt}` })
          .expect(200)
          .then(() => {
            request(app)
              .post("/user/signin")
              .send({
                email: "test_delete_user@gmail.com",
                password: "abcd1234!",
              })
              .expect(400)
              .end((err, res) => {
                res.body.code.should.be.equal(490);
                done();
              });
          });
      });
    });
  });
});

// describe("METHOD /url -> description", () => {
//   describe("성공 시", () => {

//   });

//   describe("실패 시", () => {

//   });
// })
