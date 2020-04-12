const hauler = require("roles_hauler");
const upgrader = require("roles_upgrader");
const builder = require("roles_builder");
const miner = require("roles_miner");
const repairer = require("roles_repairer");
const harvester = require("roles_harvester");
const claimer = require("roles_claimer");
const remoteBuilder = require("roles_remoteBuilder");
const spawner = require("buildings_spawner");

module.exports.loop = function () {
  spawner.run();

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == "hauler") {
      hauler.run(creep);
    } else if (creep.memory.role == "upgrader") {
      upgrader.run(creep);
    } else if (creep.memory.role == "builder") {
      builder.run(creep);
    } else if (creep.memory.role == "miner") {
      miner.run(creep);
    } else if (creep.memory.role == "repairer") {
      repairer.run(creep);
    } else if (creep.memory.role == "harvester") {
      harvester.run(creep);
    } else if (creep.memory.role == "claimer") {
      claimer.run(creep);
    } else if (creep.memory.role == "remoteBuilder") {
      remoteBuilder.run(creep);
    }
  }
};
