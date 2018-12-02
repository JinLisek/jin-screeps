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

const findBuildingOrFortificationToRepair = creep =>
{
    const structure = Game.rooms[creep.memory.homeRoom].find(FIND_STRUCTURES, {filter: struct => isBuildingMineAndDamaged(struct)})[0]

    if(structure != undefined)
        return structure

    const structureInWorkRoom = Game.rooms[creep.memory.workRoom].find(FIND_STRUCTURES, {filter: struct => isBuildingMineAndDamaged(struct)})[0]

    if(structureInWorkRoom != undefined)
        return structureInWorkRoom
    
    return MaintainerHelper.findFortificationWithLowestHitsWrapper(creep)
}

const repairBuilding = creep =>
{
    creep.memory.targetId = RoleFunctions.findTargeIdtIfNoLongerValid(creep, findBuildingOrFortificationToRepair, isStructureDamaged(creep))
    const damagedStructure = Game.getObjectById(creep.memory.targetId)
    MaintainerHelper.moveToTargetAndRepairIt(creep, damagedStructure)
}






const BuildingMaintainer =
{
    run: creep =>
    {
        creep.memory.isRepairing = MaintainerHelper.shouldRepair(creep)

        MaintainerHelper.isRepairing(creep) ?
            repairBuilding(creep) :
            EnergyGatherer.gatherEnergy(creep)
	}
}

module.exports = BuildingMaintainer