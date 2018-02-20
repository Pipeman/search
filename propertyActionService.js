const fs = require("fs");

exports.getPropertyList = getPropertyList;
exports.search = search;

// In a real case scenario this lines are not present
// and are replaced with proper calls to a service
let data = {};
const dataPath = "./static/data.json";
fs.readFile(dataPath, (err, bytesRead) => {
    if(err) {
      throw err;
    }
    data = JSON.parse(bytesRead);
  }
);

function getPropertyList() {
  return data;
}

function search(queryString) {
  if(queryString === data.area) {
    return data;
  }
  
  return 404;
}
