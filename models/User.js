const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'userToken.json');

module.exports = class User {
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
