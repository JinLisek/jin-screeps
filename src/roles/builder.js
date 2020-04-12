const builder = (creep) => {
  if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.building = false;
  }
  if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length > 0) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
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
};

module.exports = builder;
