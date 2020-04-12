const claimer = {
  run: function (creep) {
    const routeToReservableRoom = Game.map.findRoute(creep.room, "E15N42");
    console.log("CLAIMER route length = " + routeToReservableRoom.length);
    if (routeToReservableRoom.length > 0) {
      const exit = creep.pos.findClosestByRange(routeToReservableRoom[0].exit);
      creep.moveTo(exit);
    } else {
      const controller = creep.room.controller;
      if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
    }
  },
};

module.exports = claimer;
