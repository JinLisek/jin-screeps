const collectEnergyByCreep = (creep) => {
  const containers = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      structure.structureType == STRUCTURE_CONTAINER &&
      structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100,
  });
  if (containers.length > 0) {
    if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(containers[0], {
        visualizePathStyle: { stroke: "#ffaa00" },
        maxRooms: 1,
      });
    }
  } else {
    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
    if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(droppedEnergy[0], {
        visualizePathStyle: { stroke: "#ffaa00" },
        maxRooms: 1,
      });
    }
  }
};

module.exports = { collectEnergyByCreep };
