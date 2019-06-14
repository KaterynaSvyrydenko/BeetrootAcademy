/**
 * @module fstools
 * @desc Contains utility functions for filesystem.
 */
const FILENAME = 'data.json'
var fs = require('fs'); 

/**
 * Read expence/income array data from json formatted file.
 * @return {Array} data - array of activities.
 */
function GetDataFromFile() {
    var json_data = fs.readFileSync(FILENAME, 'utf-8');
    if( json_data == '' )
        return [];
	var data = JSON.parse(json_data);

    data.forEach(function(item)
    {
    	item.date = new Date(item.date);
    });
	return data;
}

/**
 * Write expence/income array data to json formatted file.
 * @param {Array} data - array of activities.
 */
function WriteDataToFile( data ) {
	fs.writeFile(FILENAME, JSON.stringify(data), (err) => {
	    if (err) {
	        alert("An error ocurred updating the file" + err.message);
	        console.log(err);
	        return;
	    }
	});
}