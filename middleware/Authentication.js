const Users = require('../models/User');

function Authentication(req, res, next) {
    Users.fetchAll((users) => {
        const userToken = users.find((user) => {
            return user.token == req.query.token;
        });

        if (userToken) {
            return next();
        } else {
            return res.status(401).send({ message: 'Unauthorized' });
        }
    });
}

module.exports = Authentication;
