const RoleFunctions = require('RoleFunctions')
const EnergyGatherer = require('EnergyGatherer')

const isConstructionSite = struct => struct.progress != undefined && struct.progress < struct.progressTotal

const findMyClosestConstructionSite = creep =>
{
    const constructionSite = Game.rooms[creep.memory.homeRoom].find(FIND_MY_CONSTRUCTION_SITES)[0]

    if(constructionSite != undefined)
        return constructionSite
    
    const constructionSiteInWorkRoom = Game.rooms[creep.memory.workRoom].find(FIND_MY_CONSTRUCTION_SITES)[0]

    return constructionSiteInWorkRoom
}

const creepBuildTarget = (creep, target) => creep.build(target)

const buildConstruction = creep =>
{
    creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(creep, findMyClosestConstructionSite, isConstructionSite)
    const constructionSite = Game.getObjectById(creep.memory.targetId)
    RoleFunctions.moveCreepToTargetThenDoAction(creep, constructionSite, creepBuildTarget, restIfTargetNotFound)
}

const isBuilding = creep => creep.memory.building

const shouldBuild = creep => (isBuilding(creep) && creep.carry.energy > 0) || creep.carry.energy == creep.carryCapacity

const restIfTargetNotFound = creep =>
{
    RoleFunctions.moveCreepToTarget(creep, new RoomPosition(41, 27, creep.memory.homeRoom))
}




const Architect = 
{
    run: creep =>
    {
        const shouldCreepBuild = shouldBuild(creep)

        if(shouldCreepBuild != creep.memory.building)
        {
            creep.memory.building = shouldBuild(creep)
            creep.memory.targetId = undefined
        }

        isBuilding(creep) ?
            buildConstruction(creep) :
            EnergyGatherer.gatherEnergy(creep)
    }
}

module.exports = Architect