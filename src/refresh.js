const Mongo = require("./functions/MongoHandler");
const User = require("./schemas/User");
async function ahh(){
await Mongo()


User.findOneAndUpdate({GoodCombatHours: {$exists:false}}, {$set: {GoodCombatHours:0 , GoodCombatMinutes:0}}).then(console.log("done"))


}
ahh()