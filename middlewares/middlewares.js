const express = require("express");
const app = express()

const Middlewares = ( ) => {
    app.use('/api/groups', require('../routes/groups.routes'))

};

module.exports = {
    Middlewares
};