/**
 * @module fstools
 * @desc Contains utility functions for filesystem.
 */
const FILENAME = 'data.json'
var fs = require('fs'); 

/**
 * Read expense/income array data from json formatted file.
 * @return {Array} data - array of activities.
 */
function getDataFromFile() {
    if( !fs.existsSync(FILENAME) )
        writeDataToFile([]);
    var json_data = fs.readFileSync(FILENAME, 'utf-8');
    if( json_data == '' )
        return [];
    var data = JSON.parse(json_data);

    data.forEach(function(item){
        item.date = new Date(item.date);
    });
    return data;
}

/**
 * Write expense/income array data to json formatted file.
 * @param {Array} data - array of activities.
 */
function writeDataToFile(data) {
    fs.writeFileSync(FILENAME, JSON.stringify(data));
}