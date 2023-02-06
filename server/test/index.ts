import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";
const should = chai.should();
chai.use(chaiHttp);

//deposit, buy, one-crud

const agent = chai.request.agent(server);
let ACCESS_TOKEN = "";

before(function(done) {
  agent
    .post("/user")
    .set("content-type", "application/json")
    .send({
      username: `User-${Math.floor(Math.random() * 10000)}`,
      password: "123456",
      country: "Malta",
      firstName: null,
      lastName: null
    })
    .then(function(res) {
      ACCESS_TOKEN = res.body.access_token;
      done();
    })
    .catch(function(err) {
      done(err);
    });
});

describe("reels game", function() {
  it("deposit", function(done) {
    agent
      .post("/deposit")
      .set("authorization", `Bearer ${ACCESS_TOKEN}`)
      .send({
        coin: 20
      })
      .end(function(err, res) {
        //console.log("deposit response", res.body);
        res.should.have.status(200);
        done();
      });
  }),
    it("spin", function(done) {
      agent
        .post("/spin")
        .set("authorization", `Bearer ${ACCESS_TOKEN}`)
        .send({})
        .end(function(err, res) {
          console.log("spin response", res.body);
          res.should.have.status(200);
          done();
        });
    });
});

after(function() {
  agent.close();
});
