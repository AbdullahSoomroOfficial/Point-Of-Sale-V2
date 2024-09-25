const serverless = require("serverless-http");
const app = require("../../app.js");

export const handler = serverless(app);
