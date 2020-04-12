const claimer = (creep) => {
  const routeToReservableRoom = Game.map.findRoute(
    creep.room,
    creep.memory.destination
  );
  if (routeToReservableRoom.length > 0) {
    const exit = creep.pos.findClosestByRange(routeToReservableRoom[0].exit);
    creep.moveTo(exit);
  } else {
    const controller = creep.room.controller;
    if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }
};

module.exports = claimer;
