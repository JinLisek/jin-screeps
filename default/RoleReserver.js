const RoleFunctions = require('RoleFunctions')



const ExitWest = new RoomPosition(0, 9, "W32S11")

const RoleReserver = {
    run: function(creep) {
        if(creep.room.controller.owner != undefined && creep.room.controller.owner.username == 'JinLisek')
            RoleFunctions.moveCreepToTarget(creep, ExitWest)
        else
        {
            creep.reserveController(creep.room.controller)
            RoleFunctions.moveCreepToTarget(creep, creep.room.controller)
        }
        
	}
};

module.exports = RoleReserver;