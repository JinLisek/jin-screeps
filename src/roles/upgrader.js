const finders = require("roles_helpers_finders");

const upgrader = (creep) => {
  if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.upgrading = false;
  }
  if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
    creep.memory.upgrading = true;
  }

  if (creep.memory.upgrading) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: "#ffffff" },
      });
    }
  } else {
    finders.collectEnergyByCreep(creep);
  }
};

module.exports = upgrader;
