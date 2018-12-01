const RoleFunctions = require('RoleFunctions')


const RoleReserver = {
    run: function(creep) {
        if(creep.room.controller.owner != undefined && creep.room.controller.owner.username == 'JinLisek')
        {
            const exitLeft = creep.pos.findClosestByPath(FIND_EXIT_LEFT);
            RoleFunctions.moveCreepToTarget(creep, exitLeft)
        }
        else
        {
            creep.reserveController(creep.room.controller)
            RoleFunctions.moveCreepToTarget(creep, creep.room.controller)
        }
        
	}
};

module.exports = RoleReserver;