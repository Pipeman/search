const restify = require("restify");
const { getPropertyList, search } = require("./propertyActionService");

const server = restify.createServer({
  name: "propertySearch",
  version: "0.0.1"
});

server.use(crossOrigin);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/search", function (req, res, next) {
  res.send(search(req.query.q));
  
  return next();
});

server.get("/get-properties", function (req, res, next) {
  res.send(getPropertyList());
  
  return next();
});

function crossOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  return next();
}

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});

module.exports = server;