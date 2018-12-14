const RoleFunctions = require('RoleFunctions')
const MaintainerHelper = require('MaintainerHelper')
const EnergyGatherer = require('EnergyGatherer')

const isStructDamaged = struct => struct.hits < struct.hitsMax
const isStructMineAndDamaged = struct => isStructDamaged(struct) && MaintainerHelper.isStructMine(struct)
const isStructCivil = struct => struct.structureType != STRUCTURE_RAMPART && struct.structureType != STRUCTURE_WALL
const isBuildingMineAndDamaged = struct => isStructMineAndDamaged(struct) && isStructCivil(struct)

const isStructureDamaged = creep => struct =>
    isBuildingMineAndDamaged(struct) ||
    MaintainerHelper.isFortificationDamaged(creep.memory.structurePercentHealth)(struct)

const isStructInWorkRoom = creep => struct => struct.room.name == creep.memory.workRoom

const findBuildingOrFortificationToRepair = creep => 
{
    const buildingToBeRepaired = creep.pos.findClosestByPath(
        FIND_STRUCTURES,
        {filter: struct => isStructureDamaged(creep)(struct) && isStructInWorkRoom(creep)(struct) })
    
    if(buildingToBeRepaired != undefined)
        return buildingToBeRepaired

    const fortifications = creep.room.find(FIND_STRUCTURES, { filter: struct => struct.structureType == STRUCTURE_RAMPART || struct.structureType == STRUCTURE_WALL})
    
    if(fortifications.length == 0)
        return undefined

    const fortificationsToBeRepaired = MaintainerHelper.findFortificationWithLowestHitsWrapper(creep)
    
    return fortificationsToBeRepaired
}

const repairBuilding = creep =>
{
    if(creep.room.name == creep.memory.workRoom)
    {
        creep.memory.targetId = RoleFunctions.findTargeIdIfNoLongerValid(
            creep,
            findBuildingOrFortificationToRepair,
            struct => isStructureDamaged(creep)(struct) || MaintainerHelper.isFortificationDamaged(creep.memory.structurePercentHealth)(struct))
        const damagedStructure = Game.getObjectById(creep.memory.targetId)
        MaintainerHelper.moveToTargetAndRepairIt(creep, damagedStructure)
    }
    else if(Game.rooms[creep.memory.workRoom] != undefined)
    {
        creep.moveTo(Game.rooms[creep.memory.workRoom].controller)
    }
    else
    {
        RoleFunctions.moveCreepToTarget(creep, new RoomPosition(31, 18, creep.memory.homeRoom))
    }
}






const BuildingMaintainer =
{
    run: creep =>
    {
        const shouldCreepRepair = MaintainerHelper.shouldRepair(creep)

        if(shouldCreepRepair != creep.memory.isRepairing)
        {
            creep.memory.isRepairing = shouldCreepRepair
            creep.memory.targetId = undefined
        }

        MaintainerHelper.isRepairing(creep) ?
                repairBuilding(creep) :
                EnergyGatherer.gatherEnergy(creep)

	}
}

module.exports = BuildingMaintainer