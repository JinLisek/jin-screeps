const RoleFunctions = require('RoleFunctions')



const LongMiner =
{
    run: creep =>
    {
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
            RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
	}
}

module.exports = LongMiner