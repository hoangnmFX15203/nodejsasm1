const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'videoList.json');

module.exports = class Video {
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

    static getVideoByMovieId(id, callback) {
        fs.readFile(p, (err, data) => {
            if (err) {
                callback([]);
                console.log(err);
            } else {
                const videoList = data.find((video) => video.id == id);
                callback(JSON.parse(videoList));
            }
        });
    }
};
