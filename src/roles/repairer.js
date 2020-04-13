const finders = require("roles_helpers_finders");

const repairer = (creep) => {
  if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.repairing = false;
  }
  if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
    creep.memory.repairing = true;
  }

  if (creep.memory.repairing) {
    if (creep.memory.targetId) {
      const repairTarget = Game.getObjectById(creep.memory.targetId);
      if (repairTarget && repairTarget.hits < repairTarget.hitsMax) {
        if (creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
          creep.moveTo(repairTarget, {
            maxRooms: 1,
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        delete creep.memory.targetId;
      }
    } else {
      const structsInNeedOfRepair = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => struct.hits < struct.hitsMax,
      });

      _.sortBy(structsInNeedOfRepair, (struct) => {
        return struct.structureType == STRUCTURE_WALL || struct.structureType == STRUCTURE_WALL
          ? struct.hits / struct.hitsMax + 0.5
          : struct.hits / struct.hitsMax;
      });

      const structToRepair = structsInNeedOfRepair[structsInNeedOfRepair.length - 1];
      if (structToRepair) {
        creep.memory.targetId = structToRepair.id;
      }
    }
  } else {
    delete creep.memory.targetId;
    finders.collectEnergyByCreep(creep);
  }
};

module.exports = repairer;
