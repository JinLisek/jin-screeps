const finders = require("roles_helpers_finders");

const goRepair = (creep) => {
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
};

const differentiateHitsPercentage = (struct) =>
  struct.structureType == STRUCTURE_RAMPART || struct.structureType == STRUCTURE_WALL
    ? struct.hits / struct.hitsMax + 0.8
    : struct.hits / struct.hitsMax;
const repairer = (creep) => {
  if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.repairing = false;
  }
  if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
    creep.memory.repairing = true;
  }

  if (creep.memory.repairing) {
    if (creep.memory.targetId) {
      goRepair(creep);
    } else {
      const structsInNeedOfRepair = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) => struct.hits < struct.hitsMax,
      });

      const sortedStructsToRepair = _.sortBy(structsInNeedOfRepair, differentiateHitsPercentage);

      const structToRepair = sortedStructsToRepair[0];
      if (structToRepair) {
        creep.memory.targetId = structToRepair.id;
        goRepair(creep);
      }
    }
  } else {
    delete creep.memory.targetId;
    finders.collectEnergyByCreep(creep);
  }
};

module.exports = repairer;
