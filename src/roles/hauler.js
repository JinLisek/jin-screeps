var hauler = {
  run: function (creep) {
    if (creep.store.getFreeCapacity() > 0) {
      const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
      if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedEnergy[0], {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    }
  },
};

module.exports = hauler;
