const express = require('express');
const app = express();
const fs = require('fs');
const port = 4000;
const cors = require('cors');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');
const Authentication = require('./middleware/Authentication');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Authentication);
app.use(movieRoutes);
app.use((req, res, next) => {
    res.status(404).send({
        message: 'Route not found',
    });
});

app.listen(port);
