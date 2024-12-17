const { Schema, model } = require("mongoose");
// Define the schema
const Communty = new Schema({
    Name: {type: String, required: true},
    DiscordId: {type: String, required: true},
    Rank: {type: String, required: true},
    Mos: {type: String, required: true},
    JoinDate: {type: Date, default: Date.now},
    CombatHours: {type: Number, defualt: 0},
    CombatMinutes: {type: Number, default: 0},
    GoodCombatHours: {type: Number, default: 0},
    GoodCombatMinutes: {type: Number, default: 0},

    IsInstructor: {type: Boolean, required: true},
    IsEnlisted: {type: Boolean, required: true},
    IsOfficer: {type: Boolean, required: true},
    IsNCO: {type: Boolean, required: true},
    IsRecruit: {type: Boolean, required: true},
    IsVeteran: {type: Boolean, required: true},
    Trainings: {type: Array, default: []},
    Notes: {type: String, default: ''},
    



});
module.exports = model("User", Communty);