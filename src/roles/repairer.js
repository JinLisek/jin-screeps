const repairer = {
  run: (creep) => {
    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.repairing = false;
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
      creep.memory.repairing = true;
    }

    if (creep.memory.repairing) {
      const structuresInNeedOfRepair = creep.room.find(FIND_STRUCTURES, {
        filter: (struct) =>
          struct.hits < struct.hitsMax &&
          struct.structureType != STRUCTURE_WALL,
      });

      if (structuresInNeedOfRepair.length > 0) {
        if (creep.repair(structuresInNeedOfRepair[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structuresInNeedOfRepair[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        creep.moveTo(16, 17);
      }
    } else {
      const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
      if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedEnergy[0], {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  },
};

module.exports = repairer;
