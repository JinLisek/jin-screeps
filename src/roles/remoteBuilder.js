const remoteBuilder = (creep) => {
  if (creep.room.name != creep.memory.destination) {
    const routeToReservableRoom = Game.map.findRoute(
      creep.room,
      creep.memory.destination
    );
    if (routeToReservableRoom.length > 0) {
      const exit = creep.pos.findClosestByRange(routeToReservableRoom[0].exit);
      creep.moveTo(exit);
    }
  } else {
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
        creep.moveTo(21, 23);
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  }
};

module.exports = remoteBuilder;
