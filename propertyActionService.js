const fs = require("fs");

exports.getPropertyList = getPropertyList;
exports.search = search;

let emptySearch = {
  result_count: 0,
  area: null,
  listing: []
};
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

function search(queryString = "") {
  if(queryString === data.area) {
    return data;
  }
  emptySearch.area = queryString;
  
  return emptySearch;
}
