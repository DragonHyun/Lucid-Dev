const should = require("should");
const request = require("supertest");
const app = require("../app");
const Board = require("../Models/MySQL").board;

describe("Post 관련 Test", () => {
  let jwt, boardId;

  before(async () => {
    const signinRes = await request(app)
      .post("/user/signin")
      .send({
        email: "test_about_post_user@gmail.com",
        password: "abcd1234!",
      })
      .expect(200);
    jwt = signinRes.body.result;

    const board = await Board.findOne({
      where: { board_name: "Test about post" },
    });
    boardId = board.dataValues.id;
  });

  describe("GET /post/board/:boardId", () => {
    describe("성공 시", () => {
      it("특정 게시판에 작성된 게시글 반환, [id, user_id, title, content, have_image, created_at]가 있어야 하며 board_id가 같아야함", (done) => {
        request(app)
          .get("/post/board/" + boardId)
          .expect(200)
          .end((err, res) => {
            res.body.result.map((post) => {
              post.should.have.properties(
                "id",
                "user_id",
                "title",
                "content",
                "have_image",
                "created_at"
              );
            });

            done();
          });
      });
    });
  });

  describe("POST /post -> 게시글 작성", () => {
    describe("성공 시", () => {
      it("작성된 게시글 반환 (image 있음), [id, board_id, user_id, title, content, have_image] 있어야 함", (done) => {
        request(app)
          .post("/post")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            boardId: boardId,
            title: "Test post have image",
            content: "Test about post have image",
            imageUrl: ["image1.com"],
          })
          .end((err, res) => {
            res.body.result.should.have.properties(
              "id",
              "user_id",
              "board_id",
              "title",
              "content",
              "have_image"
            );
            res.body.result.title.should.be.equal("Test post have image");
            res.body.result.have_image.should.be.equal(1);

            done();
          });
      });

      it("작성된 게시글 반환 (image 없음)", (done) => {
        request(app)
          .post("/post")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({
            boardId: boardId,
            title: "Test post have not image",
            content: "Test about post have not image",
            imageUrl: [],
          })
          .end((err, res) => {
            res.body.result.should.have.properties(
              "id",
              "user_id",
              "board_id",
              "title",
              "content",
              "have_image"
            );
            res.body.result.have_image.should.be.equal(0);

            done();
          });
      });
    });

    describe("실패 시", () => {
      it("필수 입력 조건이 비어있을 경우 400 반환 & code=400", (done) => {
        request(app)
          .post("/post")
          .set({ Authorization: `Bearer ${jwt}` })
          .send({})
          .end((err, res) => {
            res.body.code.should.be.equal(400);

            done();
          });
      });
    });
  });

  describe("PATCH /post/:postId -> 게시글 수정", () => {});
});
