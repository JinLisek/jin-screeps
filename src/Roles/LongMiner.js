const RoleFunctions = require('RoleFunctions')

const findClosestActiveSource = creep =>  creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

const creepHarvestTarget = (creep, target) => creep.harvest(target)

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(36, 29, 'W33S11'))
}

const LongMiner =
{
    run: creep =>
    {
        if(creep.memory.workRoom == undefined)
            creep.memory.workRoom = 'W33S11'
        
        if(creep.room.name == creep.memory.workRoom)
        {
            creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(
                creep,
                findClosestActiveSource,
                target => true)
    
            const harvestTarget = Game.getObjectById(creep.memory.targetId)
    
            RoleFunctions.moveCreepToTargetThenDoAction(creep, harvestTarget, creepHarvestTarget, restIfTargetNotFound)
        }
        else
            RoleFunctions.moveCreepToTarget(creep, Game.rooms[creep.memory.workRoom].controller)
	}
}

module.exports = LongMiner