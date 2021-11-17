require("dotenv").config();
const Tuit = require("../../database/models/tuit");
const getTuit = require("./tuitController");

describe("Given a getTuit function", () => {
  describe("When receives a method get", () => {
    test("It should invoke method json with array of tuits", async () => {
      const tuit = [{}, {}];
      const res = {
        json: jest.fn(),
      };
      Tuit.find = jest.fn().mockResolvedValue(tuit);

      await getTuit(null, res);

      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("When don t receives a array", () => {
    test("It should invoke the next function with a error", async () => {
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const error = new Error();

      Tuit.find = jest.fn().mockRejectedValue(error);

      await getTuit(null, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
