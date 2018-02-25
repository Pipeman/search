const restify = require("restify");
const errors = require("restify-errors");
const { getPropertyList, search } = require("./propertyActionService");

const server = restify.createServer({
  name: "propertySearch",
  version: "0.0.1"
});

server.use(allowCrossOrigin);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/search", function (req, res, next) {
  const searchResults = search(req.query.q);
  if (!searchResults) {
    return next(new errors.ResourceNotFoundError("cane"));
  }

  res.send(searchResults);
  
  return next();
});

server.get("/results", function (req, res, next) {
  res.send(getPropertyList());
  
  return next();
});

server.on("NotFound", (req, res, err, cb) => {
  err.toJSON = () => ({
      code: "WrongPath",
      message: "Requested page not found",
    });

  return cb();
});

function allowCrossOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  return next();
}

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});

module.exports = server;