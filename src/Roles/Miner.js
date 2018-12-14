const RoleFunctions = require('RoleFunctions');

const findMiningPlace = creep =>
{
    const source = Game.getObjectById(creep.memory.miningSourceId)
    const containers = source.pos.findInRange(FIND_STRUCTURES, 1, { filter: struct => struct.structureType == STRUCTURE_CONTAINER })
    return _.isEmpty(containers) ? source : containers[0]
}

const findSourceIdWithoutMiners = creep =>
{
    const homeRoom = Game.rooms[creep.memory.homeRoom]
    const vassals = homeRoom.memory.vassals
    const rooms = _.filter(Game.rooms, room => room.name == creep.memory.homeRoom || _.includes(vassals, room.name))
    const sources = _.reduce(
        rooms,
        (sources, room) => sources = sources.concat(room.find(FIND_SOURCES)),
        [])

    const sourcesWithoutMiner = _.filter(
        sources, 
        source => 
            Memory.sources[source.id] == undefined ||
            Game.creeps[Memory.sources[source.id]] == undefined
    )
  
    return sourcesWithoutMiner[0]
}

const creepMineSource = (creep, target) =>
{
    const source = Game.getObjectById(creep.memory.miningSourceId)
    creep.harvest(source)
}

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(25, 25, creep.memory.homeRoom))
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
            else
            {
                restIfTargetNotFound(creep)
            }
        }
        else
        {
            creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(creep, findMiningPlace)
            const miningPlace = Game.getObjectById(creep.memory.targetId)
            RoleFunctions.moveCreepToTargetThenDoAction(creep, miningPlace, creepMineSource, restIfTargetNotFound)
        }
	}
}

module.exports = Miner