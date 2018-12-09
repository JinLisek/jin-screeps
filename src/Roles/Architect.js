const RoleFunctions = require('RoleFunctions')
const EnergyGatherer = require('EnergyGatherer')

const findMyClosestConstructionSite = creep =>
{
    const constructionSite = Game.rooms[creep.memory.homeRoom].find(FIND_MY_CONSTRUCTION_SITES)[0]

    if(constructionSite != undefined)
        return constructionSite
    
    const constructionSiteInWorkRoom = Game.rooms[creep.memory.workRoom].find(FIND_MY_CONSTRUCTION_SITES)[0]

    if(constructionSiteInWorkRoom != undefined)
        return constructionSiteInWorkRoom

    const structInNewRoom = Game.rooms['W33S12'].find(FIND_MY_CONSTRUCTION_SITES)[0]

    return structInNewRoom
}

const creepBuildTarget = (creep, target) =>
{
    creep.build(target)
    creep.memory.targetId = undefined
}

const buildConstruction = creep =>
{
    creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(creep, findMyClosestConstructionSite)
    const constructionSite = Game.getObjectById(creep.memory.targetId)
    RoleFunctions.moveCreepToTargetThenDoAction(creep, constructionSite, creepBuildTarget, restIfTargetNotFound)
}

const isBuilding = creep => creep.memory.building

const shouldBuild = creep => (isBuilding(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(41, 27, 'W32S11'))
}




const Architect = 
{
    run: creep =>
    {
        creep.memory.building = shouldBuild(creep)

        isBuilding(creep) ?
            buildConstruction(creep) :
            EnergyGatherer.gatherEnergy(creep)
    }
}

module.exports = Architect