const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'movieList.json');
const getMoviesFromFile = (callback) => {
    fs.readFile(p, 'utf8', (err, data) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(data));
        }
    });
};

module.exports = class Movie {
    constructor() {}

    save() {}

    static fetchAll(callback) {
        fs.readFile(p, (err, data) => {
            if (err) {
                callback([]);
                console.log(err);
            }
            callback(JSON.parse(data));
        });
    }

    
};
