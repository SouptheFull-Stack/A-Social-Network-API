// importing mongoose module for server connection
const { connect, connection } = require("mongoose");

// mongodb connection
connect("mongodb://127.0.0.1:27017/socialNetworkAPI");

module.exports = connection;
