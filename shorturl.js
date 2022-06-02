const fs = require("fs");
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    var b = JSON.parse(jsonData);
    // console.log(b);
    return b;
  
}
const dataPath = "user.json"
console.log(getAccountData())


const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    console.log(stringifyData)
    fs.writeFileSync(dataPath, stringifyData)

}
module.exports.urlshotner = (url, callback) => {

    url




}