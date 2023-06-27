const mongoose = require("mongoose");

const Role = mongoose.Schema({
    value: { type: String, unique: true, default: "USER" },
});

module.exports = mongoose.model("Role", Role);
