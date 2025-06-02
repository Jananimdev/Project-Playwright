const fs = require('fs');//built-in Node.js module allows you to interact with file system reading etc
const path = require('path');//Another built-in module that helps in handling and transforming file paths

class JSONHandler {
  static readJSON(filePath) { //This means you can call this method directly on the class without creating an instance
    const fullPath = path.resolve(__dirname, filePath);//relative path to the JSON file //__dirname gives the absolute path of the current file (jsonHandler.js).
    const rawData = fs.readFileSync(fullPath, 'utf-8');//Reads the file synchronously 
    return JSON.parse(rawData);//Converts the JSON string into a JavaScript object and returns it
  }

  static writeJSON(filePath, data) {
    const fullPath = path.resolve(__dirname, filePath);
    const jsonData = JSON.stringify(data, null, 2);//Converts the JavaScript object (data) into a JSON string.
    fs.writeFileSync(fullPath, jsonData, 'utf-8');
  }
}

module.exports = JSONHandler;

//Why i kept JsonHandler in Utils means because it doesnt need any environmnet to perform the task 