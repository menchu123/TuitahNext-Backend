require("dotenv").config();
const Tuit = require("../../database/models/tuit");
const { getTuits, createTuit, deleteTuit } = require("./tuitController");

jest.mock("../../database/models/tuit");

describe("Given a getTuits function", () => {
  describe("When receives a method get", () => {
    test("It should invoke method json with array of tuits", async () => {
      const tuit = [{}, {}];
      const res = {
        json: jest.fn(),
      };
      Tuit.find = jest.fn().mockResolvedValue(tuit);

      await getTuits(null, res);

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

      await getTuits(null, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createTuit function", () => {
  describe("When reject promese", () => {
    test("It should invoke the next function with error, code 400 and message 'Something error tuit!!!'", async () => {
      const req = {
        body: {
          title: "hola",
          likes: 0,
          date: "2020-09-01",
          id: 3,
        },
      };
      const next = jest.fn();
      Tuit.create = jest.fn().mockRejectedValue();
      const error = new Error("Something error tuit!!!");
      error.code = 400;

      await createTuit(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a good request", () => {
    test("It should response a status 201 and newTuit in json", async () => {
      const req = {
        body: {
          title: "hola",
          likes: 0,
          date: "2020-09-01",
          id: 3,
        },
      };

      const res = {
        json: jest.fn().mockResolvedValue(req.body),
      };
      Tuit.create = jest.fn().mockResolvedValue(req.body);

      await createTuit(req, res);

      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });
});

describe("Given a deleteTuit function", () => {
  describe("When it receives a request with an id 1, a response and a next function", () => {
    test("Then it should call the Tuit.findByIdAndDelete with a 1", async () => {
      const idTuit = 1;
      const req = {
        params: {
          idTuit,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteTuit(req, res, next);
      expect(Tuit.findByIdAndDelete).toHaveBeenCalledWith(idTuit);
    });
  });

  describe("And Tuit.findByIdAndDelete rejects", () => {
    test("Then it should call next with an error", async () => {
      const error = {};
      Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("And Tuit.findByIdAndDelete returns undefined", () => {
    test("Then it should call next with an error", async () => {
      const error = new Error("Tuit not found");
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(undefined);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
