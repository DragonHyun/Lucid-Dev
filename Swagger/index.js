const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test Swagger",
      version: "1.0.0",
      description: "swagger test",
    },
    host: "localhost:8000",
    basePath: "/",
  },
  apis: ["./Swagger/API/*.yaml", "./Swagger/Schema/*.yaml"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
