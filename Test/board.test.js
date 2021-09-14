const should = require("should");
const request = require("supertest");
const app = require("../app");
const Board = require("../Models/MySQL").board;
const sequelize = require("sequelize");

describe("Board 관련 Test", () => {
  describe("POST /board -> 게시판 생성", () => {
    describe("성공 시", () => {
      it("게시판을 반환하며, [id, board_name]이 있어야함", (done) => {
        const boardName = "Test Board 1";

        request(app)
          .post("/board")
          .send({
            boardName: boardName,
          })
          .expect(200)
          .end((err, res) => {
            res.body.result.should.have.properties("id", "board_name");
            res.body.result.board_name.should.be.equal(boardName);

            done();
          });
      });
    });

    describe("실패 시", () => {
      it("필수 입력 조건이 비어있을 경우 400 반환 & code=400", (done) => {
        request(app)
          .post("/board")
          .send({})
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(400);

            done();
          });
      });

      it("board_name이 중복될 경우 400반환 & code=461", (done) => {
        const duplicateBoardName = "duplicate_board_name";

        request(app)
          .post("/board")
          .send({
            boardName: duplicateBoardName,
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(461);

            done();
          });
      });
    });
  });

  describe("PATCH /board/:boardId -> 게시판 수정", () => {
    let boardId;
    const boardName = "Test Board 1";

    before(async () => {
      const board = await Board.findOne({
        where: {
          board_name: boardName,
          deleted_at: null,
        },
      });

      boardId = board.dataValues.id;
    });

    describe("성공 시", () => {
      const modifyBoardName = "Modify Test Board 1";

      it("Test Board 1 게시판을 Modify Test Board 1으로 수정, 200 반환", (done) => {
        request(app)
          .patch("/board/" + boardId)
          .send({
            boardName: modifyBoardName,
          })
          .expect(200)
          .end(done);
      });
    });

    describe("실패 시", () => {
      const duplicateBoardName = "duplicate_board_name";

      it("필수 입력 조건이 비어있을 경우(boardName) 400 반환 & code=400", (done) => {
        request(app)
          .patch("/board/" + boardId)
          .send({})
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(400);

            done();
          });
      });

      it("path parameter 없을 경우 404 반환", (done) => {
        request(app)
          .patch("/board/")
          .send({
            boardName: duplicateBoardName,
          })
          .expect(404)
          .end(done);
      });

      it("Modify Test Board 1 게시판을 중복된 이름으로 수정, 400 반환 & code=461", (done) => {
        request(app)
          .patch("/board/" + boardId)
          .send({
            boardName: duplicateBoardName,
          })
          .expect(400)
          .end((err, res) => {
            res.body.code.should.be.equal(461);

            done();
          });
      });
    });
  });

  describe("DELETE /board/:boardId -> 게시판 삭제", () => {
    describe("성공 시", () => {
      let boardId;
      const boardName = "It will be delete";

      before(async () => {
        const board = await Board.findOne({
          where: {
            board_name: boardName,
            deleted_at: null,
          },
        });

        boardId = board.dataValues.id;
      });

      it("게시판 삭제를 하게되면 해당 게시판을 찾을 수 없어야 함", async () => {
        const deleteBoard = await request(app)
          .delete("/board/" + boardId)
          .expect(200);

        const board = await Board.findOne({
          where: {
            board_name: boardName,
            deleted_at: null,
          },
        });

        (board === null).should.be.equal(true);
      });
    });
  });

  describe("GET /baord -> 모든 게시판 조회", () => {
    describe("성공 시", () => {
      it("모든 게시판 반환, [id, board_name]이 있어야 함.", (done) => {
        request(app)
          .get("/board")
          .expect(200)
          .end((err, res) => {
            res.body.result.map((board) => {
              board.should.have.properties("id", "board_name");
            });

            done();
          });
      });
    });
  });
});
