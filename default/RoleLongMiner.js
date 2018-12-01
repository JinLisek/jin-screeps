const RoleFunctions = require('RoleFunctions')



const RoleLongMiner = {
    run: function(creep) {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'
        
        if(creep.room.name == creep.memory.workRoom)
        {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            const harvestResult = creep.harvest(source)
            if(harvestResult == ERR_NOT_IN_RANGE)
                RoleFunctions.moveCreepToTarget(creep, source)
        }
        else
        {
            const exitLeft = creep.pos.findClosestByPath(FIND_EXIT_LEFT)
            RoleFunctions.moveCreepToTarget(creep, exitLeft)
        }
	}
};

module.exports = RoleLongMiner;