const finders = require("roles_helpers_finders");

const hauler = (creep) => {
  if (creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.hauling = false;
  }
  if (!creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
    creep.memory.hauling = true;
  }

  if (creep.memory.hauling) {
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      maxRooms: 1,
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
    if (target) {
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
          visualizePathStyle: { stroke: "#ffffff" },
        });
      }
    } else {
      const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        maxRooms: 1,
        filter: (structure) => {
          return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        },
      });
      if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      } else {
        creep.moveTo(24, 32);
      }
    }
  } else {
    finders.collectEnergyByCreep(creep);
  }
};

module.exports = hauler;
