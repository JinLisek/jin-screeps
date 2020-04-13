const finders = require("roles_helpers_finders");

const repairer = (creep) => {
  if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.repairing = false;
  }
  if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
    creep.memory.repairing = true;
  }

  if (creep.memory.repairing) {
    const strucInNeedOfRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      maxRooms: 1,
      filter: (struct) =>
        struct.hits < struct.hitsMax && struct.structureType != STRUCTURE_WALL,
    });

    if (strucInNeedOfRepair) {
      if (creep.repair(strucInNeedOfRepair) == ERR_NOT_IN_RANGE) {
        creep.moveTo(strucInNeedOfRepair, {
          visualizePathStyle: { stroke: "#ffffff" },
        });
      }
    } else {
      creep.moveTo(16, 17);
    }
  } else {
    finders.collectEnergyByCreep(creep);
  }
};

module.exports = repairer;
