var harvester = require("roles_harvester");
var upgrader = require("roles_upgrader");
var builder = require("roles_builder");
let spawner = require("buildings_spawner");

module.exports.loop = function () {
  spawner.run();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      harvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      upgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      builder.run(creep);
    }
  }
};
