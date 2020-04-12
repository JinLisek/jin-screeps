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
  spawner();

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    if (creep.memory.role == "hauler") {
      hauler(creep);
    } else if (creep.memory.role == "upgrader") {
      upgrader(creep);
    } else if (creep.memory.role == "builder") {
      builder(creep);
    } else if (creep.memory.role == "miner") {
      miner(creep);
    } else if (creep.memory.role == "repairer") {
      repairer(creep);
    } else if (creep.memory.role == "harvester") {
      harvester(creep);
    } else if (creep.memory.role == "claimer") {
      claimer(creep);
    } else if (creep.memory.role == "remoteBuilder") {
      remoteBuilder(creep);
    }
  }
};
