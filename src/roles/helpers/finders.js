const collectEnergyByCreep = (creep) => {
  const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    maxRooms: 1,
    filter: (structure) =>
      (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
      structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100,
  });
  if (container) {
    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(container, {
        visualizePathStyle: { stroke: "#ffaa00" },
        maxRooms: 1,
      });
    }
  } else {
    const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    if (droppedEnergy && creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
      creep.moveTo(droppedEnergy, {
        visualizePathStyle: { stroke: "#ffaa00" },
        maxRooms: 1,
      });
    }
  }
};

module.exports = { collectEnergyByCreep };
