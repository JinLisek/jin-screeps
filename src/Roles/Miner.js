const RoleFunctions = require('RoleFunctions');

const MinerResPost = new RoomPosition(44, 7, "W32S11")

const isContainerNearby = structure =>
    structure.pos.findInRange(FIND_STRUCTURES, 1, { filter: struct => struct.structureType == STRUCTURE_CONTAINER }).length > 0

const findMiningContainerForCreep = creep =>
    creep.pos.findClosestByPath(
        FIND_STRUCTURES, 
        {
            filter: struct => 
                struct.structureType == STRUCTURE_CONTAINER &&
                struct.pos.findInRange(FIND_SOURCES, 1, { filter: source => source.id == creep.memory.miningSourceId}).length > 0
        }
    )

const mine = creep =>
{
    const targetContainer = findMiningContainerForCreep(creep)
    
    if(creep.pos.getRangeTo(targetContainer) > 0)
        RoleFunctions.moveCreepToTarget(creep, targetContainer)
    else
    {
        const source = Game.getObjectById(creep.memory.miningSourceId)
        const harvestResult = creep.harvest(source)
        RoleFunctions.ifNotZero(harvestResult, console.log, "ERROR: creep.harvest: " + harvestResult + ", position: " + creep.pos)
    }
}


const Miner =
{
    run: creep =>
    {
        if(creep.memory.miningSourceId == undefined)
        {
            const sourcesWithContainersInRoom = creep.room.find(FIND_SOURCES,{ filter: source => isContainerNearby(source) })
            const minersInRoom = creep.room.find(FIND_MY_CREEPS, { filter: c => c.memory.role == "Miner" })
    
            const sourcesWithoutMiners = _.reject(
                sourcesWithContainersInRoom, 
                source => _.some(minersInRoom, miner => miner.memory.miningSourceId == source.id));
            
            if(sourcesWithoutMiners.length > 0)
                creep.memory.miningSourceId = sourcesWithoutMiners[0].id
        }
        else
        {
            mine(creep)
        }
	}
}

module.exports = Miner