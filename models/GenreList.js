const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'genreList.json');
const getGenreFromFile = (callback) => {
    fs.readFile(p, 'utf8', (err, data) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(data));
        }
    });
};

module.exports = class Genre {
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

    static findById(id, callback) {
        fs.readFile(p, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const genre = data.find((genre) => genre.id == id);
                callback(genre);
            }
        });
    }
};
