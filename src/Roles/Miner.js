const RoleFunctions = require('RoleFunctions');

const findMiningContainerForCreep = creep =>
{
    const containerForMiningInHomeRoom = Game.rooms[creep.memory.homeRoom].find(
        FIND_STRUCTURES, 
        {
            filter: struct => 
                struct.structureType == STRUCTURE_CONTAINER &&
                struct.pos.findInRange(FIND_SOURCES, 1, { filter: source => source.id == creep.memory.miningSourceId}).length > 0
        }
    )[0]
    
    if(containerForMiningInHomeRoom != undefined)
        return containerForMiningInHomeRoom
    
    return Game.rooms[creep.memory.workRoom].find(
        FIND_STRUCTURES, 
        {
            filter: struct => 
                struct.structureType == STRUCTURE_CONTAINER &&
                struct.pos.findInRange(FIND_SOURCES, 1, { filter: source => source.id == creep.memory.miningSourceId}).length > 0
        }
    )[0]
}

const findSourceIdWithoutMiners = creep =>
{
    const sourceWithoutMinerInHomeRoom = Game.rooms[creep.memory.homeRoom].find(
        FIND_SOURCES, 
        { filter: 
            source => Memory.sources[source.id] == undefined || 
            (Game.creeps[Memory.sources[source.id]] == undefined &&
            source.pos.findInRange(FIND_STRUCTURES, 1, { filter: struct => struct.structureType == STRUCTURE_CONTAINER}).length > 0)
        })[0]

    if(sourceWithoutMinerInHomeRoom != undefined)
        return creep.memory.miningSourceId = sourceWithoutMinerInHomeRoom
    
    const sourceWithoutMinerInWorkRoom = Game.rooms[creep.memory.workRoom].find(
        FIND_SOURCES, 
        { filter: 
            source => Memory.sources[source.id] == undefined || 
            Game.creeps[Memory.sources[source.id]] == undefined &&
            source.pos.findInRange(FIND_STRUCTURES, 1, { filter: struct => struct.structureType == STRUCTURE_CONTAINER}).length > 0
        })[0]

    return sourceWithoutMinerInWorkRoom
}

const creepMineSource = (creep, target) =>
{
    const source = Game.getObjectById(creep.memory.miningSourceId)
    creep.harvest(source)
}


const Miner =
{
    run: creep =>
    {
        if(creep.memory.miningSourceId == undefined || Memory.sources[creep.memory.miningSourceId] != creep.name)
        {
            const source = findSourceIdWithoutMiners(creep)
            if(source != undefined)
            {
                const sourceId = source.id
                Memory.sources[sourceId] = creep.name
                creep.memory.miningSourceId = sourceId
            }
        }
        else
        {
            const source = Game.getObjectById(creep.memory.miningSourceId)
            creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(creep, findMiningContainerForCreep)
            const miningContainer = Game.getObjectById(creep.memory.targetId)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, miningContainer, creepMineSource)
        }
	}
}

module.exports = Miner