const Mongo = require("./functions/MongoHandler");
const User = require("./schemas/User");
async function ahh(){
await Mongo()


User.findOneAndUpdate({CombatMinutes: {$exists:false}}, {$set: {CombatMinutes: 0}}).then(console.log("done"))


}
ahh()