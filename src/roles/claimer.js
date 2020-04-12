const claimer = {
  run: function (creep) {
    console.log("CLAIMER in " + creep.room.name);
    if (creep.room.name == "E15N41") {
      const exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
      creep.moveTo(exit);
    } else if (creep.room.name == "E15N42") {
      const controller = creep.room.controller;
      if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
    } else if (creep.room.name == "E14N42") {
      const exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
      creep.moveTo(exit);
    }
  },
};

module.exports = claimer;
